import { List, ListItem, ListItemText, ListItemIcon, Box } from "@mui/material";

export default function TheoryList({ items }: { items: string[] }) {
  return (
    <List dense sx={{ mb: 3 }}>
      {items.map((item, i) => (
        <ListItem
          key={i}
          disablePadding
          sx={{ display: "flex", alignItems: "flex-start" }}
        >
          {/* Bullet point personalizzato */}
          <ListItemIcon sx={{ minWidth: 24, mt: "6px" }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: "primary.main",
                borderRadius: "50%",
                mt: 0.5,
              }}
            />
          </ListItemIcon>

          {/* Testo della lista */}
          <ListItemText
            primary={item}
            primaryTypographyProps={{ fontSize: 16 }}
            sx={{ ml: 0 }}
          />
        </ListItem>
      ))}
    </List>
  );
}
