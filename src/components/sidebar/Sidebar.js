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
        let count = trucks.length;
        let hub = []

        for (let i = 0; i !== count; i++) {
            if (trucks[i] !== undefined) {
                let truck = {
                    id: i + 1,
                    col1: trucks[i].current_driver.raw.NAME1,
                    col2: trucks[i].current_driver.raw.NAME2
                }
                hub = [...hub, truck]
            }
        }
        return hub;
    }

    return (
        <div className="tableDiv">
            {props.trucks.length > 0 &&
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