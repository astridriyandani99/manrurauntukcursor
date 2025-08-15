

import { GoogleGenAI } from "@google/genai";
import { manruraData } from "../data/manruraData";
import { GEMINI_MODEL } from '../constants';
import type { AssessmentData, Standard } from "../types";

const systemInstruction = `You are a helpful assistant for MANRURA (Manajemen Ruang Rawat), a set of standards for hospital ward management at RSUP Dr. Kariadi Semarang. Your purpose is to help hospital staff understand and apply these standards.

You must answer questions based *only* on the provided MANRURA document. Do not use any external knowledge. If the answer is not in the document, say that you cannot find the information in the MANRURA guide.
Your answers should be clear, concise, and professional. You should answer in the same language as the user's question (Indonesian or English).
The full MANRURA document is provided below in JSON format. Use it as your single source of truth.

MANRURA Document (JSON):
${JSON.stringify(manruraData)}
`;

const getApiClient = (apiKey: string) => {
  if (!apiKey) {
    throw new Error("API key is required.");
  }
  return new GoogleGenAI({ apiKey });
};

export const askManruraAssistant = async (prompt: string, apiKey: string): Promise<string> => {
  try {
    const ai = getApiClient(apiKey);
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        systemInstruction: systemInstruction,
      }
    });
    
    return response.text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('API_KEY_INVALID'))) {
       throw new Error("I'm sorry, but the API key is not valid. Please check the configuration.");
    }
    throw new Error("I'm having trouble connecting to my knowledge base right now. Please try again in a moment.");
  }
};


export const generateAssessmentAnalysis = async (
  apiKey: string,
  wardName: string,
  assessmentData: AssessmentData,
  standards: Standard[]
): Promise<string> => {
  
  const poinMap = new Map(standards.flatMap(std => std.elements.flatMap(el => el.poin.map(p => [p.id, p.text]))));

  let formattedData = "";
  for (const poinId in assessmentData) {
    const data = assessmentData[poinId];
    if (data.assessor?.score !== null && data.assessor?.score !== undefined) {
      formattedData += `- Poin: "${poinMap.get(poinId) || 'Unknown Poin'}"\n`;
      formattedData += `  - Skor Asesor: ${data.assessor.score}/10\n`;
      if(data.assessor.notes) formattedData += `  - Catatan Asesor: "${data.assessor.notes}"\n`;
      if(data.wardStaff?.score !== null && data.wardStaff?.score !== undefined) {
          formattedData += `  - Skor Staf: ${data.wardStaff.score}/10\n`;
      }
      if(data.wardStaff?.notes) formattedData += `  - Catatan Staf: "${data.wardStaff.notes}"\n`;
    }
  }

  if (!formattedData) {
    return "## Analisis Tidak Dapat Dibuat\n\nTidak ada data penilaian yang cukup dari asesor untuk dianalisis pada ruang ini.";
  }

  const analysisSystemInstruction = `You are an expert hospital quality management consultant. Your task is to analyze ward assessment data based on the MANRURA standards and provide a comprehensive report in Indonesian. The report must be clear, professional, and actionable.`;

  const analysisPrompt = `
    Tolong analisis data penilaian untuk **${wardName}** berdasarkan standar MANRURA.

    **Data Penilaian (Hanya data yang telah divalidasi oleh Asesor):**
    ${formattedData}

    **Tugas Anda:**
    Berdasarkan **hanya** pada data yang diberikan, buatlah laporan komprehensif dalam format Markdown dengan bagian-bagian berikut:

    1.  **## Ringkasan Umum**
        Tulis paragraf singkat yang merangkum kinerja umum ruang rawat, menyoroti tren keseluruhan dari data.

    2.  **## Kekuatan Utama**
        Identifikasi dan berikan poin-poin untuk 3 hingga 5 area di mana ruang rawat menunjukkan kinerja yang sangat baik (skor 10). Sebutkan contoh spesifik dari data penilaian.

    3.  **## Area yang Membutuhkan Perhatian**
        Identifikasi dan berikan poin-poin untuk 3 hingga 5 area yang paling membutuhkan perbaikan (skor 0 atau 5, atau berdasarkan catatan kritis dari asesor). Jelaskan mengapa area ini penting.

    4.  **## Rekomendasi Tindak Lanjut**
        Untuk setiap area yang membutuhkan perhatian, berikan rekomendasi yang konkret, praktis, dan dapat ditindaklanjuti. Rekomendasi harus membantu kepala ruang untuk membuat perbaikan. Contoh: "Untuk poin 'X', rekomendasinya adalah mengadakan sesi pelatihan singkat tentang 'Y'".

    Gunakan Bahasa Indonesia yang profesional dan lugas.
  `;
  
  try {
     const ai = getApiClient(apiKey);
     const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [{ role: 'user', parts: [{text: analysisPrompt}] }],
        config: {
          systemInstruction: analysisSystemInstruction,
          temperature: 0.5,
        }
    });

    return response.text;

  } catch (error) {
    console.error("Error calling Gemini API for analysis:", error);
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('API_KEY_INVALID'))) {
       throw new Error("The provided API key is not valid. Please check it in the Admin Dashboard.");
    }
    throw new Error("An error occurred while generating the analysis. Please check the console for details.");
  }
};