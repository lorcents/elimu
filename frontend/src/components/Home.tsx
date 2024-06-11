import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery, gql } from '@apollo/client';
import { Container, Typography, Box, Button, Card, CardMedia, CardContent, Grid } from '@mui/material';
import {  Delete } from '@mui/icons-material';
import Slider from 'react-slick';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import LoadMoreButton from './LoadMoreButton'
import { Book } from './types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const BOOKS_QUERY = gql`
  query Books($offset: Int!, $limit: Int!, $searchTerm: String, $readingLevel: String) {
    books(offset: $offset, limit: $limit, searchTerm: $searchTerm, readingLevel: $readingLevel) {
      id
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10); // Number of items per page
  const [selectedFilter, setSelectedFilter] = useState<string>('All Levels');
  console.log(readingList);

  const filters = ['All Levels', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const { loading: booksLoading, error: booksError, data: booksData, fetchMore } = useQuery<{ books: Book[] }>(
    BOOKS_QUERY,
    {
      variables: { offset, limit, searchTerm: '', readingLevel: selectedFilter },
    }
  );

  const [fetchSearchResults, { data: searchData }] = useLazyQuery<{ books: Book[] }>(BOOKS_QUERY);

  useEffect(() => {
    
    if (searchTerm) {
      fetchSearchResults({ variables: { offset: 0, limit, searchTerm, readingLevel: selectedFilter } });
    }
  }, [searchTerm, fetchSearchResults, limit, selectedFilter]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const loadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchMore({
      variables: { offset: newOffset, limit, searchTerm: '', readingLevel: selectedFilter },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          books: [...prev.books, ...fetchMoreResult.books],
        };
      },
    });
  };
  

  const addToReadingList = (book: Book) => {
    setReadingList(prevReadingList => {
     
      if (!prevReadingList.find(item => item.id === book.id)) {
        return [...prevReadingList, book];
      }
      return prevReadingList;
    });
  };

  const removeFromReadingList = (id: number) => {
    setReadingList(readingList.filter(book => book.id !== id));
  };

  if (booksLoading && offset === 0) return <p>Loading...</p>;
  if (booksError) return <p>Error: {booksError.message}</p>;
   const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: readingList.length > 0 ? <SampletArrow /> : null,
    prevArrow: readingList.length > 0 ? <SampletArrow /> : null,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  function SampletArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color:"white", background: "#5ACCCC", borderRadius: '50%', padding:'5px' }}
        onClick={onClick}
      />
    );
  }
  return (
    <Container>
      {/* Reading List */}
      <Typography variant="h5" style={{ marginTop: 20, marginBottom: 20 }}>
        Reading List
      </Typography>
      {readingList.length === 0 ? (
      <Typography variant="body1" style={{ marginBottom: 20 }}>
        Your reading list is empty. Add books by clicking on "Add to Reading List" on the search results.
      </Typography>
    ) : (
      <Slider {...settings}>
        {readingList.map((book, index) => (
          <div key={`${book.title}-${index}`} className="tilt-card">
            <Card style={{ margin: '0 10px', borderRadius: 10 }}>
              <CardMedia
                component="img"
                style={{ width: '100%', height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                image={book.coverPhotoURL}
                alt={book.title}
              />
              <CardContent style={{ textAlign: 'center', height: 150, overflow: 'hidden' }}>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1">{book.author}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Delete />}
                  onClick={() => removeFromReadingList(book.id)}
                  style={{ marginTop: 10 }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    )}


      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Filter Buttons */}
      <FilterButtons filters={filters} selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />

      {/* Display search results or fetched data */}
      <Box marginTop={4}>
        <Grid container spacing={4}>
          {(searchTerm ? searchData?.books : booksData?.books)?.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10, borderRadius: 10 }}>
                <CardMedia
                  component="img"
                  style={{ width: '100%', height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                  image={book.coverPhotoURL}
                  alt={book.title}
                />
                <CardContent style={{ textAlign: 'center', height: 150, overflow: 'hidden' }}>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="subtitle1" style={{ opacity: 0.6 }}> By {book.author}</Typography>
                  <Typography variant="body2" style={{color:'#FAAD00'}}>Level : {book.readingLevel}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToReadingList(book)}
                    style={{ marginTop: 10,color:'blanchedalmond' }}
                  >
                    Add to Reading List
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box textAlign="center" marginTop={2}>
        <LoadMoreButton onClick={loadMore} />
      </Box>
    </Container>
  );
};

export default Home;
