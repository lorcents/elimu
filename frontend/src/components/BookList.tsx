import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Book } from "./types";
import {  Add } from '@mui/icons-material';

interface BookListProps {
  books: Book[];
  onAddToReadingList: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onAddToReadingList }) => {
  return (
    <Grid container spacing={2} marginTop={2}>
      {books.map((book, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={`${book.title}-${book.author}-${index}`}
        >
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <CardMedia
              component="img"
              style={{
                width: "100%",
                height: 200,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              image={book.coverPhotoURL}
              alt={book.title}
            />
            <CardContent
              style={{ textAlign: "center", height: 150, overflow: "hidden" }}
            >
              <Typography variant="h6">{book.title}</Typography>
              <Typography variant="subtitle1">{book.author}</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => onAddToReadingList(book)}
                style={{ marginTop: 10 }}
              >
                Add to Reading List
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
