import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import XLSX from 'xlsx';



const AddChart = (props)=>{

    const [status, setStatus] = useState(0) //0:idle and empty, 1:uploading, 2: uploaded and ready
    const [file, setCurFile] = useState()
    const [theme, setTheme] = useState("nivo")
    const [data, setData] = useState()
    const [cols, setCols] = useState()

    const [parsed, setParsed] = useState({
        key: "",
        layout: "",
        keys: "",
        indexBy: "",
        theme: ""
    })
    const themeOptions = [
        "nivo", 
        "dark2",
        "red_blue",
        "greys",
        "spectral",
        "blue_purple",
      ]

      function onChange(e) {   
        // const files = e.target.files;
        setCurFile(e.target.files[0])
        console.log(e.target.files[0]);
        const reader = new FileReader()
        reader.onload = (e) =>{
            const bstr = e.target.result

            var workbook = XLSX.read(bstr, {type:'binary'})
            
            var sheetNames = workbook.SheetNames
    
            var sheetIndex = 1;
    
            var json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[sheetIndex-1]])
    
            setData(json)
            console.log(data);
        }

      }

    return (
        <div>
        <FormControl>
          <FormLabel>Import excel</FormLabel>
          {/* material ui doesnt have a file upload */}
          <Button variant="text" component="label">
            Upload a file
            <input type="file" onChange={(e)=>{onChange(e)}} hidden />
          </Button>

          <FormHelperText>Import from excel xlsx</FormHelperText>
        </FormControl>

        <div>

        </div>
    </div>)
}

export default AddChart;