import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useApiDelete from "./deleteapi";
import useApi from "./fetchapi";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import CustomizedDialogs from "./popupforadd";

const NpmDataTable = () => {
  const apiUrl = "https://gorest.co.in/public/v2/users";
  const { data, loading, error } = useApi(apiUrl, []);
  const { deleteData, deleteloading, deleteerror } = useApiDelete();
  const authToken =
    "9b24d96d3a87920f101218d1cb70376a5f0c51e16a1bbb836dd15a9cf2b67026";

  const handleDelete = (row) => {
    const deleteUrl = `https://gorest.co.in/public/v2/users/${row.id}`;

    // Wrap the delete operation in a try-catch block to handle errors gracefully
    try {
      deleteData(deleteUrl, authToken);
      console.log(`Delete ID: ${row.id}`);
      console.log(deleteUrl);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error(`Error deleting ID ${row.id}: ${error.message}`);
    }
  };

  // Improved error handling
  if (loading || deleteloading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (deleteerror) {
    return <div>Error deleting data: {deleteerror.message}</div>;
  }

  const columns = [
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            color="error"
            onClick={() => handleDelete(row)}
            disabled={false}
            size="small"
            variant="contained"
            sx={{ m: "3px" }}
            endIcon={<DeleteIcon />}
          >
            Delete
          </Button>

          <Link to={`/Update/${JSON.stringify(row)}`}>
            <Button
              color="success"
              onClick={() => handleDelete(row)}
              disabled={false}
              size="small"
              variant="contained"
              sx={{ m: "3px" }}
              endIcon={<Edit />}
            >
              Edit
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
     
      <DataTable
        title="User Details"
        columns={columns}
        data={data}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="350px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={<CustomizedDialogs/>}
      />
    </>
  );
};

export default NpmDataTable;
