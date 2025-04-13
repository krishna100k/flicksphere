import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IProps, movieClickHandler } from '@/lib/MovieClickHandler';
import { useRouter } from 'next/navigation';
import { CWState } from '../moviecards';
import { useSelector } from 'react-redux';
import styles from "./MovieGrid.module.css"


const paginationModel = { page: 0, pageSize: 10 };
const theme = createTheme({
    palette: {
        mode: "dark"
    }
})

const MovieGrid: React.FC<{ showsData: any[], type : String }> = ({ showsData, type }) => {

    let titleField = type === 'Movies' ? 'title' : 'name';
    let releaseDate = type ==  "Movies" ? 'release_date' : 'first_air_date'
    const router = useRouter();
    const CWData = useSelector((state : CWState) => state?.continueWatching?.data);

    const columns: GridColDef[] = [
        {
            field: 'poster_path',
            headerName: 'Image',
            width: 130,
            sortable : false,
            renderCell : (params) => {
                const imageUrl = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${params.value}`
                return <img className='h-full' src={imageUrl} alt='Image' />
            },
        },
        
        { field: titleField, headerName: 'Title', width: 190 },
        { field: 'popularity', headerName: 'Popularity', width: 150 },
        { field: releaseDate, headerName: 'Release Date', width: 150 },
        {
            field: 'vote_average',
            headerName: 'Vote Average',
            width: 170,
        },
        {
            field: 'vote_count',
            headerName: 'Vote Count',
            width: 150,
        },
        { field: 'overview', headerName: 'Overview', width: 500 },
    ];

        let clickHandlerArguements : IProps = {
          type : type as string,
          router,
          data : {},
          CWData
        }

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={showsData}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10, 15, showsData.length]}
                    sx={{ border: 0 }}
                    rowHeight={80}
                    onRowClick={(e) => {movieClickHandler({...clickHandlerArguements, data : e.row})}}
                />
            </Paper>
        </ThemeProvider>
    );
}

export default MovieGrid