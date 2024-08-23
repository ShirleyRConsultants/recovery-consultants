"use client";

import React, { useState } from "react";
import clientQuestions from "../clientQuestions";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/Auth";
import { useParams } from 'next/navigation';

interface Question {
  question: string;
  options: string[];
}

type QuestionsProps = {
  id: string 
}

const QuestionsComponent: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [values, setValues] = useState<number[]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(false);
  const { profile } = useAuth();
  const supabase = createClient();
  // Get all the keys of the clientQuestions object
  const questionKeys = Object.keys(clientQuestions) as Array<
    keyof typeof clientQuestions
  >;
  // Get the current question object using the index
  const currentQuestionKey = questionKeys[currentQuestionIndex];
  const currentQuestion = clientQuestions[currentQuestionKey];

  const params = useParams();
  const { id } = params;
  
  console.log(id, "ID PARAMS")

  const handleOptionClick = (option: number) => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setValues([...values, option]);
    if (currentQuestionIndex == 12) {
      setQuestionsAnswered(true);
    }
  };

  const submitValues = async () => {
    const currentDate = new Date();

    try {
      // Step 1: Fetch the existing values from the database
      const { data, error: fetchError } = await supabase
        .from("clients")
        .select(
          "sobriety, nutrition, purpose, sleep, anxiety, depression, family, routine, support, future, emotional_response, finance, entries"
        )
        .eq("id", id)
        .single(); // Assuming you're fetching a single row

      if (fetchError) {
        throw fetchError;
      }

      // Step 2: Append the new values to the existing ones
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

      // Step 3: Update the database with the combined arrays
      const { error: updateError } = await supabase
        .from("clients")
        .update(updatedValues)
        .eq("auth_id", profile?.id);

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

  console.log(values);
  console.log(currentQuestionIndex, "Q index");
  return !questionsAnswered ? (
    <div className="border border-1 rounded-lg p-10 w-96 mb-24">
      {currentQuestionIndex < questionKeys.length ? (
        <div className="text-center">
          <h2>{currentQuestion.Q}</h2>
          <div className="flex-1 w-full flex flex-col gap-2 items-center mt-4">
            {Object.entries(currentQuestion)
              .filter(([key]) => key !== "Q") // Filter out the question text
              .map(([key, option], index) => (
                <button
                  className="border border-1 rounded-lg border-light"
                  key={index}
                  onClick={() => handleOptionClick(parseInt(key))}
                >
                  {option}
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <button onClick={submitValues} className="">
            Submit
          </button>
        </div>
      )}
    </div>
  ) : (
    <>
      <div>Thank you!</div>
    </>
  );
};

export default QuestionsComponent;
