"use client";

import React, { useEffect, useState } from "react";
import clientQuestions from "../clientQuestions";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/Auth";
import { useParams } from "next/navigation";

interface Question {
  question: string;
  options: string[];
}

type QuestionsProps = {
  id: string;
};

const QuestionsComponent: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [values, setValues] = useState<number[]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(false);
  const [assessmentDue, setAssessmentDue] = useState(false);
  const [lastEntryDate, setLastEntryDate] = useState<Date | null>(null);
  const { profile, loading } = useAuth();
  const supabase = createClient();

  const questionKeys = Object.keys(clientQuestions) as Array<
    keyof typeof clientQuestions
  >;
  const currentQuestionKey = questionKeys[currentQuestionIndex];
  const currentQuestion = clientQuestions[currentQuestionKey];

  const params = useParams();
  const { id } = params;

  if (profile?.type_of_user === "admin"){
    
    return (
      <>
      <>Admin cannot take assessment for clients. Please have the corresponding case manager facilitate.</>
      </>
    )
  }
  
  useEffect(() => {
    const checkLastEntry = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("clients")
          .select("entries")
          .eq("id", id)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (data?.entries && data.entries.length > 0) {
          const lastEntryDate = new Date(data.entries[data.entries.length - 1]);
          setLastEntryDate(lastEntryDate);

          const currentDate = new Date();
          const timeDifference =
            currentDate.getTime() - lastEntryDate.getTime();
          const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

          if (timeDifference > oneWeekInMilliseconds) {
            setAssessmentDue(true);
          } else {
            setAssessmentDue(false);
          }
        } else {
          setAssessmentDue(true);
        }
      } catch (error) {
        console.error("Error fetching or processing entries:", error);
        setAssessmentDue(false);
      }
    };

    checkLastEntry();
  }, [id, setAssessmentDue]);

  const handleOptionClick = (option: number) => {
    setValues([...values, option]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex == 12) {
      setQuestionsAnswered(true);
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Move back one question
      setValues(values.slice(0, -1)); // Remove the last selected option from values
    }
  };

  const resetForm = () => {
    setCurrentQuestionIndex(0);
    setValues([]);
    setQuestionsAnswered(false);
  };

  const submitValues = async () => {
    const currentDate = new Date();
    console.log("submitting......");
    try {
      const { data, error: fetchError } = await supabase
        .from("clients")
        .select(
          "sobriety, nutrition, purpose, sleep, anxiety, depression, family, routine, support, future, emotional_response, finance, entries"
        )
        .eq("id", id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      const updatedValues = {
        sobriety: [...(data.sobriety || []), values[0]],
        nutrition: [...(data.nutrition || []), values[1]],
        purpose: [...(data.purpose || []), values[2]],
        sleep: [...(data.sleep || []), values[3]],
        anxiety: [...(data.anxiety || []), values[4]],
        depression: [...(data.depression || []), values[5]],
        family: [...(data.family || []), values[6]],
        routine: [...(data.routine || []), values[7]],
        support: [...(data.support || []), values[8]],
        future: [...(data.future || []), values[9]],
        emotional_response: [...(data.emotional_response || []), values[10]],
        finance: [...(data.finance || []), values[11]],
        entries: [...(data.entries || []), currentDate],
      };

      const { error: updateError } = await supabase
        .from("clients")
        .update(updatedValues)
        .eq("id", id);

      if (updateError) {
        throw updateError;
      }
      console.log("Values appended successfully.");
      setQuestionsAnswered(true);
    } catch (error: any) {
      console.error("Error updating client data:", error.message);
      alert("There was an error updating the client data. Please try again.");
    }
  };

  if (!profile?.type_of_user) {
    return <>Loading.....</>;
  }

  if (!assessmentDue && lastEntryDate) {
    const nextAssessment = new Date(lastEntryDate);
    nextAssessment.setDate(nextAssessment.getDate() + 7);

    return (
      <div>
        {lastEntryDate && (
          <p className="m-4 mt-12 text-white bg-mint rounded-xl p-1 text-center">
            Assessment not due until {nextAssessment.toDateString()}
          </p>
        )}
      </div>
    );
  }

  console.log(values);

  const colors = ["#99999A", "#D1D1D3", "#AFD3DB", "#ACDCD3", "#DACDE0"];

  return !questionsAnswered && !loading ? (
    <>
      {currentQuestionIndex < questionKeys.length ? (
        <div className="border border-1 text-white bg-mint rounded-lg p-8 w-96 shadow-lg">
          <p className="text-center text-lg font-bold">Weekly Assessment</p>
          <div className="text-center bg-mint">
            <h2>{currentQuestion.Q}</h2>
            <div className="flex-1 w-full flex flex-col gap-2 items-center mt-4">
              {Object.entries(currentQuestion)
                .filter(([key]) => key !== "Q")
                .map(([key, option], index) => (
                  <button
                    className="border border-1 min-w-full border-white my-1 p-2 text-white py-2 rounded-md"
                    key={index}
                    style={{ backgroundColor: colors[index % colors.length] }}
                    onClick={() => handleOptionClick(parseInt(key))}
                  >
                    {option}
                  </button>
                ))}
            </div>
            <button
              onClick={goBack}
              className="text-sm bg-purp text-white p-2 rounded-lg m-1"
            >
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-24">
          <button
            onClick={submitValues}
            className="text-sm bg-purple-300 text-white p-2 rounded-lg m-1"
          >
            Submit
          </button>
          <button
            onClick={resetForm}
            className="text-sm bg-purple-300 text-white p-2 rounded-lg m-1"
          >
            Reset
          </button>
        </div>
      )}
    </>
  ) : (
    <>
      <div className="bg-mint text-white rounded-xl p-4 mt-20">Thank you!</div>
    </>
  );
};

export default QuestionsComponent;
