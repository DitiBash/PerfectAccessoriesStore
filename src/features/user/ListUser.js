import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{fetchAllUsers} from './userSlice';

 const BasicTable=()=> { 
function createData( name, password,telphone, tz, mail) {
  return { name, password,telphone, tz, mail};
}
let rows = useSelector(s => s.user.userArr);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

rows.map((item)=>  createData(item.name,item.password,item.telphone,item.tz,item.mail))

  return (
    <TableContainer >
      <h1>רשימת משתמשים</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">name</TableCell>
            <TableCell align="center">password</TableCell> 
            <TableCell align="center">telphone </TableCell>
            <TableCell align="center">tz</TableCell>
            <TableCell align="center">mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.password}</TableCell> 
              <TableCell align="center">{row.telphone}</TableCell>
              <TableCell align="center">{row.tz}</TableCell>
              <TableCell align="center">{row.mail}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default BasicTable;