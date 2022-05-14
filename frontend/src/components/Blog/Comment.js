// import React from "react";

// export default function Comment({ comment, id }) {
//     const handleClose = () => {
//         setAnchorEl(null);
//       };

//       const open = Boolean(anchorEl);
//       const popId = open ? "simple-popover" : undefined;

//       const handleDeleteComment = (mid) => {
//         dispatch(deleteComment(id, mid));
//       };
//   return (
//     <div>
//       <div className="border">
//         <div className="flex  items-center justify-between">
//           <div className="flex  items-center gap-2">
//             <div className="w-10 h-10 rounded-full">
//               <img src={PF + comment.profilePicture} alt="" />
//             </div>
//             <p className="text-xs font-normal">{comment.name}</p>
//           </div>
//           <div className="text-xs">
//             <div
//               aria-describedby={id}
//               variant="contained"
//               onClick={function (event) {
//                 setAnchorEl(event.currentTarget);
//                 if (user._id === comment.user) {
//                   setCommentId(comment._id);
//                   console.log(true);
//                 } else {
//                   setCommentId("");
//                 }
//               }}
//             >
//               <MoreHorizIcon className="cursor-pointer" />
//             </div>
//             <Popover
//               id={popId}
//               open={open}
//               anchorEl={anchorEl}
//               onClose={handleClose}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "center",
//               }}
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "center",
//               }}
//             >
//               <div className="p-2">
//                 <p className="text-xs hover:text-indigo-500 mb-2 cursor-pointer font-normal">
//                   View Profile
//                 </p>
//                 {commentId && user._id === comment.user && (
//                   <button
//                     onClick={() => handleDeleteComment(commentId)}
//                     className="text-xs hover:text-indigo-500 cursor-pointer font-normal"
//                   >
//                     Delete Comment
//                   </button>
//                 )}
//               </div>
//             </Popover>
//           </div>
//         </div>

//         {/* Comment Message */}

//         <div className="p-2 rounded border relative grid grid-cols-1">
//           <p className={`max-w-xl ${"float-right"}`}>{comment.message}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
