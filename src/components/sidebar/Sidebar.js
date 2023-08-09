import { DataGrid } from '@mui/x-data-grid';

const rows = [
    { id: 1, col1: 'Hello', col2: 'World' }
];

const columns = [
    { field: 'col1', headerName: 'Truck plate', width: 150 },
    { field: 'col2', headerName: 'Driver name', width: 150 },
];

export default function ListOfTrucks(props) {

    function formatTable() {
        let trucks = props.trucks
        let hub = []

        for (const [key, value] of Object.entries(trucks)) {
            if (value !== undefined) {
                let plate, name;
                if (value.current_driver !== "No driver"){
                    plate =  value.NAME1
                    name = value.NAME2
                } else {
                    plate = "No plate"
                    name = " No driver"
                }
                let truck = {
                    id: key,
                    col1: plate,
                    col2: name
                }
                hub = [...hub, truck]
            }
        }
        return hub;
    }

    return (
        <div className="tableDiv">
            {Object.keys(props.trucks).length > 0 &&
                <DataGrid
                    rows={formatTable()}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {

                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            }

        </div>
    );
}