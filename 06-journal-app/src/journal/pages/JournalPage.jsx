import { useDispatch, useSelector } from "react-redux"

import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"

import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { startNewNote } from "../../store/journal"

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      { !!active ? <NoteView /> : <NothingSelectedView /> }

      <IconButton
        onClick={ onClickNewNote }
        disabled={ isSaving }
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
