import { Box } from "@mui/material";

export default function GridTheoryBackground({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundSize: "40px 40px",
          backgroundPosition: "20px 20px", // 👈 offset iniziale
          backgroundImage: `
            linear-gradient(to right, #cfd8dc 1px, transparent 1px),
            linear-gradient(to bottom, #cfd8dc 1px, transparent 1px)
          `,
          animation: "moveGrid 12s linear infinite",
          opacity: 0.75,
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>

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

// export default function GridTheoryBackground({
//   children,
// }: {
//   children?: React.ReactNode;
// }) {
//   return (
//     <Box
//       sx={{
//         position: "relative", // nel flusso normale, si adatta al contenuto
//         width: "100%",
//         backgroundColor: "#ffffff",
//         overflow: "hidden",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%", // si estende al contenuto
//           backgroundSize: "40px 40px",
//           backgroundImage: `
//             linear-gradient(to right, #cfd8dc 1px, transparent 1px),
//             linear-gradient(to bottom, #cfd8dc 1px, transparent 1px)
//           `,
//           animation: "moveGrid 12s linear infinite",
//           opacity: 0.75,
//           zIndex: 0,
//         },
//       }}
//     >
//       <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>

//       <style>
//         {`
//           @keyframes moveGrid {
//             0% { transform: translate(0, 0); }
//             100% { transform: translate(-40px, -40px); }
//           }
//         `}
//       </style>
//     </Box>
//   );
// }
