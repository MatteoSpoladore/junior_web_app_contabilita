import { Box } from "@mui/material";

export default function GridBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Usiamo la variabile CSS per lo sfondo principale definita in App.css
        backgroundColor: "var(--bg-main)",
        overflow: "hidden",
        position: "relative",
        margin: 0,
        padding: 0,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundSize: "40px 40px",
          backgroundPosition: "20px 20px",
          // Usiamo la variabile CSS per il colore della griglia definita in App.css
          backgroundImage: `
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
          `,
          animation: "moveGrid 10s linear infinite",
          zIndex: 0,
        },
        // Forziamo le Card e i Testi MUI figli ad adattarsi al tema
        "& .MuiCard-root": {
          backgroundColor: "var(--bg-box)",
          color: "var(--text-main)",
        },
        "& .MuiTypography-root, & .MuiFormLabel-root, & .MuiInputBase-input": {
          color: "var(--text-main)",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--border-color)",
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--info-accent)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>

      <style>
        {`
          @keyframes moveGrid {
            from {
              background-position: 20px 20px;
            }
            to {
              background-position: -20px -20px;
            }
          }
        `}
      </style>
    </Box>
  );
}
// import { Box } from "@mui/material";

// export default function GridBackground({ children }) {
//   return (
//     <Box
//       sx={{
//         width: "100vw",
//         height: "100vh",
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#ffffff",
//         overflow: "hidden",
//         position: "relative",
//         margin: 0,
//         padding: 0,
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           inset: 0,
//           backgroundSize: "40px 40px",
//           backgroundPosition: "20px 20px", // 👈 offset iniziale
//           backgroundImage: `
//             linear-gradient(to right, #cfd8dc 1px, transparent 1px),
//             linear-gradient(to bottom, #cfd8dc 1px, transparent 1px)
//           `,
//           animation: "moveGrid 10s linear infinite",
//           zIndex: 0,
//         },
//       }}
//     >
//       <Box
//         sx={{
//           position: "relative",
//           zIndex: 1,
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         {children}
//       </Box>

//       <style>
//         {`
//           @keyframes moveGrid {
//             from {
//               background-position: 20px 20px;
//             }
//             to {
//               background-position: -20px -20px;
//             }
//           }
//         `}
//       </style>
//     </Box>
//   );
// }

// // import { Box } from "@mui/material";

// // export default function GridBackground({ children }) {
// //   return (
// //     <Box
// //       sx={{
// //         width: "100vw",
// //         height: "100vh",
// //         minHeight: "100vh",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         backgroundColor: "#ffffff",
// //         overflow: "hidden",
// //         position: "relative",
// //         margin: 0,
// //         padding: 0,
// //         "&::before": {
// //           content: '""',
// //           position: "absolute",
// //           top: 0,
// //           left: 0,
// //           width: "200%",
// //           height: "200%",
// //           backgroundSize: "40px 40px",
// //           backgroundImage: `
// //             linear-gradient(to right, #cfd8dc 1px, transparent 1px),
// //             linear-gradient(to bottom, #cfd8dc 1px, transparent 1px)
// //           `,
// //           animation: "moveGrid 10s linear infinite",
// //           zIndex: 0,
// //         },
// //       }}
// //     >
// //       <Box
// //         sx={{
// //           position: "relative",
// //           zIndex: 1,
// //           width: "100%",
// //           display: "flex",
// //           justifyContent: "center",
// //         }}
// //       >
// //         {children}
// //       </Box>
// //       <style>
// //         {`
// //           @keyframes moveGrid {
// //             0% { transform: translate(0, 0); }
// //             100% { transform: translate(-40px, -40px); }
// //           }
// //         `}
// //       </style>
// //     </Box>
// //   );
// // }
