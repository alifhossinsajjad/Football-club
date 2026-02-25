// // 2. NotableDiscoveries.jsx
// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { SquarePen, Plus, Trash2 } from "lucide-react";

// export default function NotableDiscoveries({
//   discoveries,
//   theme,
//   isEditing,
//   onUpdate,
// }) {
//   const [discoveriesState, setDiscoveriesState] = useState(discoveries || []);

//   const handleDiscoveryChange = (index, field, value) => {
//     const updatedDiscoveries = [...discoveriesState];
//     updatedDiscoveries[index] = {
//       ...updatedDiscoveries[index],
//       [field]: value,
//     };
//     setDiscoveriesState(updatedDiscoveries);
//     if (onUpdate) {
//       onUpdate(updatedDiscoveries);
//     }
//   };

//   const addNewDiscovery = () => {
//     const newDiscovery = {
//       name: "",
//       position: "",
//       club: "",
//       year: new Date().getFullYear().toString(),
//     };
//     const updatedDiscoveries = [...discoveriesState, newDiscovery];
//     setDiscoveriesState(updatedDiscoveries);
//     if (onUpdate) {
//       onUpdate(updatedDiscoveries);
//     }
//   };

//   const removeDiscovery = (index) => {
//     const updatedDiscoveries = discoveriesState.filter((_, i) => i !== index);
//     setDiscoveriesState(updatedDiscoveries);
//     if (onUpdate) {
//       onUpdate(updatedDiscoveries);
//     }
//   };

//   return (
//     <div
//       className="rounded-xl p-8 border"
//       style={{
//         backgroundColor: theme.colors.backgroundCard,
//         borderColor: `${theme.colors.primaryCyan}33`,
//       }}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-white">Notable Discoveries</h2>
//         {isEditing && (
//           <button
//             onClick={addNewDiscovery}
//             className="p-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors"
//             style={{ color: theme.colors.primaryCyan }}
//           >
//             <Plus
//               className="w-5 h-5 text-gray-400"
//               style={{ color: theme.colors.primaryCyan }}
//             />
//             <p>Add Discovery</p>
//           </button>
//         )}
//       </div>

//       <div className="space-y-4">
//         {discoveriesState.map((player, i) => (
//           <div
//             key={i}
//             className="flex justify-between border items-center p-5 rounded-xl"
//             style={{
//               backgroundColor: theme.colors.backgroundCard,
//               borderColor: `${theme.colors.primaryCyan}33`,
//             }}
//           >
//             <div className="flex-1">
//               {isEditing ? (
//                 <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
//                   <Input
//                     value={player.name}
//                     onChange={(e) =>
//                       handleDiscoveryChange(i, "name", e.target.value)
//                     }
//                     placeholder="Player name"
//                     className="w-full"
//                   />
//                   <Input
//                     value={player.position}
//                     onChange={(e) =>
//                       handleDiscoveryChange(i, "position", e.target.value)
//                     }
//                     placeholder="Position"
//                     className="flex-1"
//                   />
//                   <Input
//                     value={player.year}
//                     onChange={(e) =>
//                       handleDiscoveryChange(i, "year", e.target.value)
//                     }
//                     placeholder="Year"
//                     className="w-full"
//                   />
//                   <div className="flex items-center gap-2">
//                     <Input
//                       value={player.club}
//                       onChange={(e) =>
//                         handleDiscoveryChange(i, "club", e.target.value)
//                       }
//                       placeholder="Club"
//                       className="text-primaryCyan font-medium mr-2"
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex gap-2">
//                     <p className="text-white font-medium">{player.name}</p>
//                     <p
//                       className="text-white text-xs px-2 py-1 rounded-md shadow-sm center"
//                       style={{
//                         color: theme.colors.primaryCyan,
//                         backgroundColor: `${theme.colors.backgroundCard}70`,
//                         border: `1px solid ${theme.colors.primaryCyan}33`,
//                       }}
//                     >
//                       {player.age}
//                     </p>
//                   </div>
//                   <p className="text-sm text-gray-400">{player.position}</p>
//                 </>
//               )}
//             </div>
//             <div>
//               {isEditing ? (
//                 <div className="flex items-center gap-2">
//                   <Input
//                     value={player.club}
//                     onChange={(e) =>
//                       handleDiscoveryChange(i, "club", e.target.value)
//                     }
//                     placeholder="Club"
//                     className="text-primaryCyan font-medium mr-2"
//                   />
//                   <button
//                     onClick={() => removeDiscovery(i)}
//                     className="text-red-500 hover:text-red-400"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
// <div className="text-right">
//   <p
//     className="text-sm"
//     style={{
//       color: theme.colors.primaryCyan,
//     }}
//   >
//     {player.club}
//   </p>
//   <p className="text-[#99A1AF] text-xs">
//     Discovered {player.year}
//   </p>
// </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// 2. NotableDiscoveries.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SquarePen, Plus, Trash2 } from "lucide-react";

export default function NotableDiscoveries({
  discoveries,
  theme,
  isEditing,
  onUpdate,
}) {
  const [discoveriesState, setDiscoveriesState] = useState(discoveries || []);

  const handleDiscoveryChange = (index, field, value) => {
    const updatedDiscoveries = [...discoveriesState];
    updatedDiscoveries[index] = {
      ...updatedDiscoveries[index],
      [field]: value,
    };
    setDiscoveriesState(updatedDiscoveries);
    if (onUpdate) {
      onUpdate(updatedDiscoveries);
    }
  };

  const addNewDiscovery = () => {
    const newDiscovery = {
      name: "",
      position: "",
      club: "",
      year: new Date().getFullYear().toString(),
    };
    const updatedDiscoveries = [...discoveriesState, newDiscovery];
    setDiscoveriesState(updatedDiscoveries);
    if (onUpdate) {
      onUpdate(updatedDiscoveries);
    }
  };

  const removeDiscovery = (index) => {
    const updatedDiscoveries = discoveriesState.filter((_, i) => i !== index);
    setDiscoveriesState(updatedDiscoveries);
    if (onUpdate) {
      onUpdate(updatedDiscoveries);
    }
  };

  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Notable Discoveries</h2>
        {isEditing && (
          <button
            onClick={addNewDiscovery}
            className="p-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors"
            style={{ color: theme.colors.primaryCyan }}
          >
            <Plus
              className="w-5 h-5 text-gray-400"
              style={{ color: theme.colors.primaryCyan }}
            />
            <p>Add Discovery</p>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {discoveriesState.map((player, i) => (
          <div
            key={i}
            className=" justify-between border items-center p-5 rounded-xl"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="">
              {isEditing ? (
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input
                    value={player.name}
                    onChange={(e) =>
                      handleDiscoveryChange(i, "name", e.target.value)
                    }
                    placeholder="Player name"
                    className="w-full py-6 rounded-lg "
                  />
                  <Input
                    value={player.position}
                    onChange={(e) =>
                      handleDiscoveryChange(i, "position", e.target.value)
                    }
                    placeholder="Position"
                    className="w-full py-6 rounded-lg "
                  />
                  <Input
                    value={player.year}
                    onChange={(e) =>
                      handleDiscoveryChange(i, "year", e.target.value)
                    }
                    placeholder="Year"
                    className="w-full py-6 rounded-lg "
                  />
                  <Input
                    value={player.club}
                    onChange={(e) =>
                      handleDiscoveryChange(i, "club", e.target.value)
                    }
                    placeholder="Club"
                    className="w-full py-6 rounded-lg "
                  />
                </div>
              ) : (
                <div className="flex justify-between">
                  <div>
                    <div className="flex gap-2">
                      <p className="text-white font-medium">{player.name}</p>
                      <p
                        className="text-white text-xs px-2 py-1 rounded-md shadow-sm center"
                        style={{
                          color: theme.colors.primaryCyan,
                          backgroundColor: `${theme.colors.backgroundCard}70`,
                          border: `1px solid ${theme.colors.primaryCyan}33`,
                        }}
                      >
                        {player.age}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400">{player.position}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-sm"
                      style={{
                        color: theme.colors.primaryCyan,
                      }}
                    >
                      {player.club}
                    </p>
                    <p className="text-[#99A1AF] text-xs">
                      Discovered {player.year}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {isEditing && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeDiscovery(i)}
                  className="text-[#FF6467] hover:text-red-400 flex gap-2 items-center mt-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Discovery
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
