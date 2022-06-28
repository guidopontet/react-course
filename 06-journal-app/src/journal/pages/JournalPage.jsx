import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"

import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

export const JournalPage = () => {
  return (
    <JournalLayout>
      <NothingSelectedView />
      {/* <NoteView /> */}

      <IconButton
        sx={{
          color: 'primary',
          backgroundColor: 'white',
          ':hover': { backgroundColor: 'white', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ stroke: "primary", strokeWidth: 2 }}/>
      </IconButton>
    </JournalLayout>
  )
}
