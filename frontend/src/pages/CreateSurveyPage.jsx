import React, { useState } from "react";
import DashboardLayout from "../component/DashboardLayout";
import CreateSurvey from "../component/CreateSurvey";
import CreateSurveySidebar from "../component/CreateSurveySidebar";
import Header from "../component/Header";

const CreateSurveyPage = ({ surveySeriesId = "defaultId" }) => {
  const [description, setDescription] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleGenerateSurvey = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/surveys/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();
      console.log("Generated survey:", data);

      // TODO: pass `data` into CreateSurvey state later
    } catch (error) {
      console.error("Error generating survey:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="lg:min-h-[90px] flex items-center justify-between px-4">
          <Header>
            <h2 className="text-[26px] font-switzerMedium text-primary">
              Create a New Survey
            </h2>
          </Header>

          {/* Generate Survey button */}
          <div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowInput(true)}
            >
              Generate Survey
            </button>
          </div>
        </div>

        {/* Input modal/box */}
        {showInput && (
          <div className="p-4 flex items-center space-x-2">
            <input
              type="text"
              className="border px-2 py-1 rounded w-96"
              placeholder="Enter survey description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={handleGenerateSurvey}
            >
              Submit
            </button>
            <button
              className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={() => setShowInput(false)}
            >
              Cancel
            </button>
          </div>
        )}

        <div className="flex grow w-full overflow-hidden h-full">
          <div className="grow p-3 sm:p-2 w-full overflow-auto h-[calc(100vh-164px)] sm:h-[calc(100vh-192px)] md:h-[calc(100vh-192px)] lg:h-[calc(100vh-148px)] xl:h-full scrollbar-style">
            <div className="block lg:hidden">
              <CreateSurveySidebar surveySeriesId={surveySeriesId} />
            </div>
            <CreateSurvey />
          </div>
          <div className="hidden lg:block min-w-[280px] p-3 max-w-[280px] overflow-auto scrollbar-style h-[calc(100vh-89px)]">
            <CreateSurveySidebar surveySeriesId={surveySeriesId} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateSurveyPage;
