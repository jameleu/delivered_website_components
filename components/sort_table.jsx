import Head from 'next/head'
import Image from 'next/image'
import styles from '../pages/library/documentation.module.scss'
import { useState, } from 'react';
import {
    Table,
    ActionIcon,
    ScrollArea,
  } from '@mantine/core';
import { IconArrowsSort } from '@tabler/icons-react';

  export default function SortTable({data}) {
    const my_data = [... data];
    const [curr_category, setSort] = useState("name");
    const [curr_data, setData] = useState(my_data); 
    
    const sortData = (sort_field) => {
        if(sort_field === curr_category) { //reverse curr sort
          let new_data = [... curr_data];
          new_data.reverse();
          setData(new_data);
        }
        else {
          //could define function since this creates code duplication
          curr_data.sort((a,b) => {
            var size_diff = a[sort_field].localeCompare(b[sort_field]);
              if(size_diff < 0) {
                return -1;
              }
              else if(size_diff > 0) {
                return 1;
              }
              return 0;
            })
          setSort(sort_field);
          setData(curr_data); 
        }

    };

    const rows = curr_data.map(obj => (
      <tr key={obj.name}>
        <td>{obj.name}</td>
        <td>{obj.date}</td>
        <td> <a href={obj.dwn} download className={styles.dwn_btn}> Download File </a> </td>
      </tr>
      )
    );
    console.info("documentation ran");

    return(
      <div>
        <ScrollArea h={400} w={1000} type="hover" offsetScrollbars scrollHideDelay={400} scrollbarSize={5}>
          {/* as needed^ */}
          <Table striped highlightOnHover verticalSpacing="md" horizontalSpacing="xl" fontSize="lg" withBorder withColumnBorders>
            <thead>
            <tr>
              <th> 
                <div className={styles.t_header_cont}>
                    <p className={styles.t_header_txt}> File Name </p>
                    <ActionIcon color="blue" size="sm" variant="light"
                      onClick={() => sortData("name")}>
                      <IconArrowsSort size="3rem"/>
                    </ActionIcon>
                </div>
              </th>
              <th>
                <div className={styles.t_header_cont}> 
                  <p className={styles.t_header_txt}> Publish Date </p> 
                    <ActionIcon color="blue" size="sm" variant="light"
                      onClick={() => sortData("date")}>
                      <IconArrowsSort size="3rem"/>
                    </ActionIcon>
                </div>
            
              </th>
              <th> <div className={styles.t_header_cont}> <p className={styles.t_header_txt}> Download Link </p> </div>
              </th>
            </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
        </ScrollArea>
      </div>
    );
  }
