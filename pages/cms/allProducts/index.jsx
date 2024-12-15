import { allProduct, allProducts, deleteProductFn } from "@/redux/cmsSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { product } from "@/api/axios";
import SweetAlertComponent from "@/ui/SweetAlert";

const AllProducts = () => {
  const [modal, setModal] = useState(false);

  // const [products, setProducts] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const { Products } = useSelector((x) => x?.Cms);
  const dispatch = useDispatch();
  const [delete_id, setDelete_id] = useState(null);

  useEffect(() => {
    dispatch(allProducts());
  }, []);
  console.log(Products, "products");
  const toggleView = () => {
    setShowTable(prev => !prev);
  };

  const handleDelete = () => {
    dispatch(deleteProductFn(delete_id)).then(() => dispatch(allProducts()));
    setDelete_id(delete_id);
    console.log(delete_id, "deleted");
    setModal(false);
// if (Records == 1) {
//     setRows(false);
// }
}


  return (
    <div
      style={{ marginBottom: "100px", marginTop: "50px", minHeight: "100vh" }}
    >
      <Button
        variant="contained"
        onClick={toggleView}
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        {showTable ? "Show Card View" : "Show Table View"}
      </Button>

      {showTable
        ? <TableContainer
            component={Paper}
            sx={{ boxShadow: 3, borderRadius: 2 }}
          >
            <Table
              sx={{
                minWidth: 650,
                backgroundColor: "#f9f9f9"
              }}
            >
              <TableHead sx={{ backgroundColor: "#3f51b5" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px"
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px"
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px"
                    }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px"
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px"
                    }}
                  >
                    Brand
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px"
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(Products) && Products.length > 0
                  ? Products.map(item =>
                      <TableRow
                        key={item._id}
                        sx={{
                          "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                          "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" },
                          border: "1px solid #ddd",
                          "&:hover": { backgroundColor: "#e0e7ff" },
                          transition: "background-color 0.3s ease"
                        }}
                      >
                        <TableCell
                          sx={{
                            padding: "12px",
                            fontSize: "15px",
                            color: "#000"
                          }}
                        >
                          {item.title}
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "12px",
                            fontSize: "14px",
                            color: "#757575"
                          }}
                        >
                          {item.description}
                        </TableCell>
                        <TableCell>
                          <img
                            src={product(item.image)}
                            alt={item.name}
                            style={{
                              marginTop: "10px",
                              borderRadius: "8px",
                              objectFit: "cover",
                              width: "300px",
                              height: "200px"
                            }}
                          />
                        </TableCell>
                        {/* <TableCell
                          sx={{
                            padding: "12px",
                            fontSize: "14px",
                            color: "#757575"
                          }}
                        >
                          {item.price}
                        </TableCell> */}
                        {/* <TableCell
                          sx={{
                            padding: "12px",
                            fontSize: "14px",
                            color: "#757575"
                          }}
                        >
                          {item.brand}
                        </TableCell> */}
                        <TableCell
                          sx={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            border: "none"
                          }}
                        >
                          <Button
                            color="error"
                            // onClick={() => handleDelete(item._id)}
                            style={{ textTransform: "capitalize" }}
                          >
                            <DeleteIcon />
                          </Button>
                          <Link
                            color="primary"
                            href={`/cms/allProducts/${item._id}`}
                            style={{ textTransform: "capitalize" }}
                          >
                            <EditIcon />
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  : <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={{
                          textAlign: "center",
                          padding: "20px",
                          color: "#757575"
                        }}
                      >
                        No products available
                      </TableCell>
                    </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        : <Grid container spacing={2}>
            {Array.isArray(Products) && Products.length > 0
              ? Products.map((item, id) =>
                  <Grid item xs={12} sm={6} md={4} key={id}>
                    <Card
                      sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        backgroundColor: "#fff",
                        color: "#000"
                      }}
                    >
                      <CardContent>
                        
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#3f51b5" }}
                        >
                          {item.title}
                        </Typography>

                         {/* Product Brand  */}
                        {/* <Typography
                          variant="body2"
                          sx={{
                            fontStyle: "italic",
                            color: "#757575",
                            marginBottom: "8px"
                          }}
                        >
                          Brand: {item.brand || "N/A"}
                        </Typography> */}

                         {/* Product Description  */}
                        <Typography
                          variant="body2"
                          sx={{ color: "#757575", marginBottom: "8px" }}
                        >
                          {item.description}
                        </Typography>

                         {/* Product Price  */}
                        {/* <Typography
                          variant="h6"
                          sx={{
                            color: "#4caf50",
                            fontWeight: "bold",
                            marginBottom: "8px"
                          }}
                        >
                          Price: ${item.price ? item.price.toFixed(2) : "N/A"}
                        </Typography> */}

                         {/* Product Image  */}
                        <Box sx={{ my: 2 }}>
                          <img
                            src={product(item.image)}
                            alt={item.name}
                            style={{
                              marginTop: "10px",
                              borderRadius: "8px",
                              objectFit: "cover",
                              width: "100%",
                              height: "200px"
                            }}
                          />
                        </Box>
                         {/* Product Actions  */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                            mt: 2
                          }}
                        >
                          <Button
                            color="error"
                            onClick={() => { setDelete_id(item._id); setModal(true); }}                            style={{ textTransform: "capitalize" }}
                          >
                            <DeleteIcon />
                          </Button>
                          <Link
                            color="primary"
                            href={`/cms/allProducts/${item._id}`}
                            style={{ textTransform: "capitalize" }}
                          >
                            <EditIcon />
                          </Link>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              : <Grid item xs={12}>
                  <Typography align="center" color="textSecondary">
                    No products available
                  </Typography>
                </Grid>}
                
          </Grid>}

          {modal && (
        <SweetAlertComponent
          confirm={()=>handleDelete()}
          cancel={() => setModal(false)}
          title={"Are you sure?"}
          subtitle={"You will not be able to recover!"}
          />
      )}
    </div>
  );
};

export default AllProducts;









