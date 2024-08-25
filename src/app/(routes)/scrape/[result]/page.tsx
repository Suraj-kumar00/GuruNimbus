// 'use client'

// import React from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { OverlayScrollbarsComponent } from "overlayscrollbars-react";


// interface ProfessorRatingProps {
//   scrapeData: {
//     profName: string;
//     profDepartment: string;
//     profSchool: string;
//     profRatingValue: string;
//     numOfRatings: number;
//     profDifficulty: string;
//     profReviews: string[];
//   } | null;
// }

// const Result: React.FC<ProfessorRatingProps> = ({ scrapeData }) => {
//   if (!scrapeData) return null;

//   return (
//     <div className="py-5 lg:py-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//         <div className="bg-[#D6C6E1] rounded-lg p-4">
//           <h3 className="text-2xl font-bold">{scrapeData.profName}</h3>
//           <p className="text-gray-600 mb-4">
//             {scrapeData.profDepartment}, {scrapeData.profSchool}
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
//             <div className="text-center">
//               <h5 className="text-xl font-bold mb-1">Rating</h5>
//               <CircularProgressbar
//                 value={
//                   scrapeData.profRatingValue
//                     ? (parseFloat(scrapeData.profRatingValue.substring(0, 3)) / 5) * 100
//                     : 0
//                 }
//                 text={
//                   scrapeData.profRatingValue
//                     ? `${scrapeData.profRatingValue.substring(0, 3)} / 5`
//                     : "N/A"
//                 }
//               />
//               <p className="mt-1">
//                 Number of Ratings:{" "}
//                 <span className="text-primary-dark font-bold text-2xl">
//                   {scrapeData.numOfRatings}
//                 </span>
//               </p>
//             </div>
//             <div className="text-center">
//               <h5 className="text-xl font-bold mb-1">Difficulty</h5>
//               <CircularProgressbar
//                 value={(parseFloat(scrapeData.profDifficulty) / 5) * 100}
//                 text={`${scrapeData.profDifficulty} / 5`}
//                 styles={buildStyles({
//                   textColor: "#61398F",
//                   pathColor: "#61398F",
//                 })}
//               />
//             </div>
//           </div>
//           <div className="flex justify-center items-center p-2 max-h-[30vh]">
//             <div className="w-full max-w-md h-full overflow-y-auto">
//               <OverlayScrollbarsComponent defer>
//                 {scrapeData.profReviews.map((review: string, index: number) => (
//                   <div key={index} className="bg-gray-100 rounded-lg p-4 mb-2">
//                     <h6 className="text-lg font-medium mb-1">Review {index + 1}</h6>
//                     <p className="text-gray-600">{review}</p>
//                   </div>
//                 ))}
//               </OverlayScrollbarsComponent>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

