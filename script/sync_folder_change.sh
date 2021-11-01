#!/bin/bash

daemon() {
    sourceFolder="public/assets/images"
    destinationFolder="src/assets/images" 
    rootFolder="src/assets"

    if [ ! -d ${destinationFolder} ]; then
        mkdir ${destinationFolder}
    fi
  
    while [[ true ]]
    do
        if [[ ! `diff -q ${sourceFolder} ${destinationFolder}` == `` ]]; 
        then
            rm -rf ${destinationFolder}
            cp -r ${sourceFolder} ${rootFolder}
            echo "update " ${destinationFolder} "from" ${sourceFolder}
        fi
          
        # sleep for 2 secs
        sleep 2
    done
}

daemon 