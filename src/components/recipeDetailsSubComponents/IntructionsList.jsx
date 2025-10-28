import React from "react";

const InstructionsList = ({ instructions }) => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-8 lg:mt-0">Instructions</h2>
    <div className="text-gray-700 space-y-4 bg-gray-100 p-6 rounded-xl shadow-inner max-h-96 overflow-y-auto">
      {instructions ? (
        instructions.split('\n').map((step, idx) =>
          step.trim() ? (
            <p key={idx} className="flex items-start">
              <span className="text-lg font-bold text-orange-600 mr-3 flex-shrink-0">{idx + 1}.</span>
              <span>{step.trim()}</span>
            </p>
          ) : null
        )
      ) : (
        <p className="text-gray-500 italic">Instructions for this recipe are not available...</p>
      )}
    </div>
  </div>
);

export default InstructionsList;