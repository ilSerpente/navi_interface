import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

const columns = [
    { field: 'col1', headerName: 'Truck plate', width: 150 },
    { field: 'col2', headerName: 'Driver name', width: 150 },
];

export default function ListOfTrucks(props) {
    const [sidebarPosition, setSidebarPosition] = useState(true);

    function handleSideBarMenuButton() {
        setSidebarPosition(prevPosition => !prevPosition);
    }

    function formatTable() {
        let trucks = props.trucks
        let hub = []

        for (const [key, value] of Object.entries(trucks)) {
            if (value !== undefined) {
                let plate, name;
                if (value.current_driver !== "No driver") {
                    plate = value.NAME1
                    name = value.NAME2
                } else {
                    plate = "No plate"
                    name = "No driver"
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
        <>
            {sidebarPosition ?
                <div className="tableDiv">
                    <div className="sideBarMenuDiv">
                        <ArrowCircleLeftOutlinedIcon className="sideBarMenuButtonOff" onClick={handleSideBarMenuButton} />
                    </div>
                    <div className="dataGridDiv">
                        {Object.keys(props.trucks).length > 0 &&
                            <DataGrid
                                rows={formatTable()}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                      paginationModel: { page: 0, pageSize: 100 },
                                    },
                                  }}
                                  pageSizeOptions={[50, 100]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        }
                    </div>
                </div> : <div className="sideBarMenuDiv">
                    <ArrowCircleRightOutlinedIcon className="sideBarMenuButtonOn" onClick={handleSideBarMenuButton} />
                </div>}
        </>
    );
}