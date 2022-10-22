import pageNavStyles from '../../styles/games/PageNav.module.css'
import {useState} from 'react'

const PageNav = ({length, onChange, selected}) => {
    const [pageNumbers, updatePageNumberSelection] = useState(Array.from({length: length}, (_, i) => i + 1));
    const [maxPages, updateMaxPages] = useState(Math.min(length, 6))

    const navClicked = (event) => {
        let clicked = event.target.innerHTML;
        let newNum = 0;
        if (parseInt(clicked) > 0){
            newNum = parseInt(clicked);
        }else{
            if (clicked == "«"){
                newNum = Math.max(1, selected - 1);
            }else if (clicked =="»"){
                newNum = Math.min(length, selected + 1);
            }
        }
        onChange(newNum)
        updatePageNumbers(newNum);
    }

    const updatePageNumbers = (num) => {
        if (pageNumbers.length <= maxPages){
            return;
        }else{
            if (selected >= Math.ceil((pageNumbers[0] + pageNumbers[maxPages -1]) / 2) || selected < Math.floor((pageNumbers[0] + pageNumbers[maxPages -1]) / 2)){
                let dif = num - Math.ceil((pageNumbers[0] + pageNumbers[maxPages -1]) / 2);
                if (!(dif + pageNumbers[maxPages - 1] > pageNumbers.length) && !(dif + pageNumbers[0] <= 0)){
                    updatePageNumberSelection(pageNumbers.map((num) => num + dif));
                    return;
                }
                
            }
        }
    }

    return (
        <div className={pageNavStyles.pageNumberList} onClick = {navClicked}>
            <p>&laquo;</p>
            {pageNumbers.map((num, index, arr) => num <= (maxPages + arr[0] -1) && (num == selected ? <p className = {pageNavStyles.active} key={index}>{num < 10 ? "0" + num : num}</p>: <p key={index}>{num < 10 ? "0" + num : num}</p>))}
            <p>&raquo;</p>
        </div>
    )
}

export default PageNav
