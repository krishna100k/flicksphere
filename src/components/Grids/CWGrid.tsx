import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IProps, movieClickHandler } from '@/lib/MovieClickHandler';
import { useRouter } from 'next/navigation';
import { CWState } from '../moviecards';
import { useSelector } from 'react-redux';
import { ContinueWatchingSchema } from '@/packages/types/continueWatching';
import { imageFallback } from '@/lib/appConstants';


const paginationModel = { page: 0, pageSize: 10 };
const theme = createTheme({
    palette: {
        mode: "dark"
    }
})

const CWGrid: React.FC<{ showsData: ContinueWatchingSchema[] }> = ({ showsData }) => {
    const router = useRouter();
    const CWData = useSelector((state : CWState) => state?.continueWatching?.data);

    const columns: GridColDef[] = [
        {
            field: 'imageUrl',
            headerName: 'Image',
            width: 130,
            sortable : false,
            renderCell : (params) => {
                const imageUrl = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${params.value}`
                return <img 
                className='h-full' 
                src={imageUrl} 
                onError={(e) => e.currentTarget.src = imageFallback} 
                alt='Image' />
            },
        },
        
        { field: 'contentName', headerName: 'Title', width: 250 },
        {
            field: 'movieId',
            headerName: 'Content Id',
            width: 170,
        },
        {
            field: 'category',
            headerName: 'Content Type',
            width: 150,
        },
        {
            field: 'season',
            headerName: 'Season No.',
            width: 170,
        },
        {
            field: 'episode',
            headerName: 'Episode No.',
            width: 150,
        },
        {
            field: 'updatedAt',
            headerName: 'Watched Date',
            width: 250,
            renderCell : (params) => {
                let isoDate = params.value
                let convertedDate = new Date(isoDate);
                let date = convertedDate.toDateString();
                let time = convertedDate.toLocaleTimeString();
                return <p>{ date} | {time}</p>
            }
        },
    ];

    const clickHandler = (userId : string, type : string, data : ContinueWatchingSchema) => {
        if (userId) {
          if (type === "movie") {
            router.push(`/${data?.movieId}?category=movie`);
            return;
          } else if (type === "tv") {
            router.push(`/${data?.movieId}?category=tv&season=${data?.season}&ep=${data?.episode}`);
            return;
          }
        }
      };


    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={showsData}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10, 30, 50, showsData.length]}
                    sx={{ border: 0 }}
                    rowHeight={80}
                    onRowClick={(e) => clickHandler(e.row.userId, e.row.category, e.row)}
                />
            </Paper>
        </ThemeProvider>
    );
}

export default CWGrid