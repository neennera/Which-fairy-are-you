"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Quiz data
const quizData = [
  {
    question:
      "คุณยืนอยู่หน้าประตูรากไม้ท่ามกลางฟ้าสว่างที่ดูเหงาหงอยและคิวที่ยาวเหยียด",
    choices: [
      { text: "ฉันควรได้สิทธิพิเศษเข้าก่อนใคร", type: "A" },
      { text: "กังวลว่าคนจะมองฉันไม่ดีหรือเปล่า", type: "B" },
      { text: "แบ่งน้ำให้แฟรี่ข้างๆ ที่ดูเหนื่อยล้า", type: "C" },
      { text: "สังเกตการณ์หาคนโกงคิวอย่างเงียบๆ", type: "D" },
    ],
  },
  {
    question:
      "คุณพบแฟรี่เด็กปีกฉีกขาดซ่อนตัวอยู่ในพุ่มไม้ ดวงตาคู่นั้นเต็มไปด้วยความสิ้นหวัง",
    choices: [
      { text: "มองว่าน่ารำคาญและบินผ่านไป", type: "A" },
      { text: "คิดว่าโชคชะตาใจร้าย (เหมือนที่ทำกับฉัน)", type: "B" },
      { text: "เข้าไปกอบกุมมือและร้องไห้ไปกับเขา", type: "C" },
      { text: "รีบทำแผลให้และสอนวิธีระวังตัว", type: "D" },
    ],
  },
  {
    question:
      "ในงานเลี้ยงที่แสงนวลตาคุณเห็นทุกคนหัวเราะ แต่ลึกๆคุณกลับรู้สึกถึงบางอย่าง",
    choices: [
      { text: "พยายามไปยืนในที่สว่างที่สุดเพื่อให้ทุกคนสนใจ", type: "A" },
      { text: "ยืนที่มุมมืด แอบหวังว่าจะมีใครสักคนสังเกตเห็นฉัน", type: "B" },
      { text: "เดินแจกรอยยิ้มและดูแลความรู้สึกคนที่ดูเหงาๆ", type: "C" },
      { text: "ยืนคุมเชิงมองหาพฤติกรรมแปลกๆ ที่ซ่อนอยู่หลังงาน", type: "D" },
    ],
  },
  {
    question: "เมื่อส่องกระจกโบราณจิตวิญญาณของคุณสั่นสะท้านกับภาพที่ปรากฏออกมา",
    choices: [
      { text: "เห็นภาพตัวเองเป็นราชาที่สง่างาม", type: "A" },
      { text: "เห็นภาพตัวเองเป็นเหยื่อที่ถูกทำร้าย", type: "B" },
      { text: "เห็นภาพดวงใจที่ส่องสว่างด้วยความรัก", type: "C" },
      { text: "เห็นภาพนักรบที่มองทะลุทุกคำลวง", type: "D" },
    ],
  },
  {
    question: "พายุเวทมนตร์พัดถล่มความกลัวเริ่มเกาะกินใจทุกคนจนเริ่มเห็นแก่ตัว",
    choices: [
      { text: "ผลักคนอื่นออกเพื่อให้ฉันเข้าที่บังแดดก่อน", type: "A" },
      { text: "ร้องไห้ตัดพ้อว่าทำไมเรื่องซวยต้องเกิดกับฉัน", type: "B" },
      { text: "ใช้ปีกตัวเองบังฝนให้เพื่อนจนตัวเองเปียกโชก", type: "C" },
      { text: "จัดระเบียบการหลบภัยและกันพวกที่เห็นแก่ตัวออก", type: "D" },
    ],
  },
  {
    question:
      "คุณถูกชี้หน้าว่าเป็นกาลกิณีเพื่อนที่เคยไว้ใจกลับมองคุณด้วยความระแวง",
    choices: [
      { text: 'ตอกกลับด้วยความโกรธว่า "แกกล้าดียังไง!"', type: "A" },
      { text: "เสียใจจนพูดไม่ออก และคิดว่าไม่มีใครรักฉันจริง", type: "B" },
      { text: "ยอมรับความผิดไว้เองเพื่อให้ทุกคนสบายใจ", type: "C" },
      { text: "สวนกลับด้วยความจริงและแฉแผนการของคนคนนั้น", type: "D" },
    ],
  },
  {
    question:
      "การจะรอดออกไป คุณต้องสละ'แสงแห่งชีวิต' ซึ่งอาจทำให้คุณอ่อนแรงไปชั่วนิรันดร์",
    choices: [
      { text: 'รอให้คนอื่นทำ "คนอย่างฉันสำคัญเกินกว่าจะเสียพลัง"', type: "A" },
      { text: '"ถ้าฉันทำแล้ว ทุกคนจะเห็นค่าความลำบากของฉันไหม?"', type: "B" },
      { text: "ยินดีสละพลังทั้งหมดที่มีเพื่อให้ทุกคนปลอดภัย", type: "C" },
      {
        text: "ยอมสละพลังส่วนหนึ่ง และบังคับให้คนที่เอาเปรียบช่วยด้วย",
        type: "D",
      },
    ],
  },
  {
    question: "เมื่อรอดมาได้ ทุกคนต่างซาบซึ้งและเข้ามาโอบกอดคุณ",
    choices: [
      { text: '"แน่นอน ถ้าไม่มีฉัน พวกคุณก็ไม่รอดหรอก"', type: "A" },
      { text: '"ไม่เป็นไร (แต่ในใจรู้สึกว่าคำขอบคุณมันน้อยไป)"', type: "B" },
      { text: '"แค่เห็นทุกคนยิ้มได้ ฉันก็มีความสุขที่สุดแล้ว"', type: "C" },
      { text: '"ยินดีที่ช่วย แต่คราวหลังจงดูแลตัวเองให้ดีกว่านี้"', type: "D" },
    ],
  },
  {
    question: "ก่อนจากลา คุณจารึกข้อความด้วยหยดน้ำตาและพลังใจลงบนแผ่นหิน",
    choices: [
      { text: '"จงก้มหัวให้ผู้ที่เหนือกว่า"', type: "A" },
      { text: '"โลกนี้ช่างใจร้ายกับฉันเหลือเกิน"', type: "B" },
      { text: '"ความรักคือเวทมนตร์ที่ยิ่งใหญ่ที่สุด"', type: "C" },
      { text: '"จงมีใจเมตตา แต่ต้องมีตาที่มองเห็นความจริง"', type: "D" },
    ],
  },
];

const resultMap: Record<string, string> = {
  A: "The Monarch",
  B: "The Fragile",
  C: "The Healer",
  D: "The Guardian",
};

// Question Component
function QuestionComp({ text }: { text: string }) {
  return (
    <div
      className="relative w-full mb-6 bg-cover bg-center bg-no-repeat p-8 rounded-lg"
      style={{ backgroundImage: "url(/button/button-question.png)" }}
    >
      <p className="text-black text-center pt-5 text-lg font-medium drop-shadow-lg">
        {text}
      </p>
    </div>
  );
}

// Choice Component
function ChoiceComp({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative w-100 -ml-7 bg-cover bg-center bg-no-repeat p-6 rounded-lg mb-4 transition-transform hover:scale-105 active:scale-95"
      style={{ backgroundImage: "url(/button/button-choice.png)" }}
    >
      <p className="text-black text-center text-sm drop-shadow-lg">{text}</p>
    </button>
  );
}

export default function Home() {
  const [stage, setStage] = useState<"cover" | "quiz" | "result">("cover");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const [result, setResult] = useState<string>("");

  // Load scores from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedScores = localStorage.getItem("quizScores");
      if (savedScores) {
        setScores(JSON.parse(savedScores));
      }
    }
  }, []);

  // Save scores to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quizScores", JSON.stringify(scores));
    }
  }, [scores]);

  const handleStartQuiz = () => {
    setStage("quiz");
    setCurrentQuestion(0);
    setScores({ A: 0, B: 0, C: 0, D: 0 });
    if (typeof window !== "undefined") {
      localStorage.removeItem("quizScores");
    }
  };

  const handleChoice = (type: "A" | "B" | "C" | "D") => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const maxScore = Math.max(
        newScores.A,
        newScores.B,
        newScores.C,
        newScores.D
      );
      const winners = (
        Object.keys(newScores) as Array<keyof typeof newScores>
      ).filter((key) => newScores[key] === maxScore);

      // If tied, pick random
      // eslint-disable-next-line react-hooks/purity
      const winner = winners[Math.floor(Math.random() * winners.length)];
      setResult(winner);
      setStage("result");
    }
  };

  const handleRestart = () => {
    setStage("cover");
    setCurrentQuestion(0);
    setScores({ A: 0, B: 0, C: 0, D: 0 });
    setResult("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("quizScores");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* Cover Stage */}
      {stage === "cover" && (
        <div
          className="relative flex flex-col items-center justify-center h-screen w-100 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/bg/bg-cover.png)" }}
        >
          <button
            onClick={handleStartQuiz}
            className="absolute bottom-50 left-5 hover:scale-110 active:scale-95 w-30 h-20 bg-cover"
            style={{ backgroundImage: "url(/button/button-start.png)" }}
          ></button>
        </div>
      )}

      {/* Quiz Stage */}
      {stage === "quiz" && (
        <div
          className="relative flex flex-col items-center justify-center h-screen w-100  bg-cover bg-center bg-no-repeat p-8"
          style={{ backgroundImage: "url(/bg/bg-quiz.png)" }}
        >
          <div className="w-full max-w-2xl">
            <QuestionComp text={quizData[currentQuestion].question} />

            <div className="space-y-3">
              {quizData[currentQuestion].choices.map((choice, index) => (
                <ChoiceComp
                  key={index}
                  text={choice.text}
                  onClick={() =>
                    handleChoice(choice.type as "A" | "B" | "C" | "D")
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Result Stage */}
      {stage === "result" && (
        <div
          className="relative flex flex-col items-center justify-center h-screen w-100 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/result/result_${result}.jpg)` }}
        ></div>
      )}
    </div>
  );
}
