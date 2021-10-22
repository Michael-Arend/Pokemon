
const Pagination : React.FC<{currentPage:number, amountPerPage:number, pokemonCount:number, pageChanged:(page:number)=>void}> = ({currentPage,amountPerPage,pokemonCount,pageChanged}) =>{

const pageCount:number = Math.ceil(pokemonCount/amountPerPage)

const pageChangedHandler = (event:React.MouseEvent, page:number) =>  pageChanged(page);



    return(
        <div className="pagination-wrapper">
            <button  disabled={currentPage < 2} onClick={(e)=>  pageChangedHandler(e,1)}>1</button>
            <button disabled={currentPage <11} onClick={(e)=>  pageChangedHandler(e,currentPage-10)}>--</button> 
            <button disabled={currentPage <2} onClick={(e)=>  pageChangedHandler(e,currentPage-1)}>-</button>
            <button style={{'background':'#a3d0f7'}}> {currentPage}</button>
            <button disabled={ currentPage === pageCount} onClick={(e)=>  pageChangedHandler(e,currentPage+1)}>+</button>
            <button disabled= {currentPage >pageCount-10} onClick={(e)=>  pageChangedHandler(e,currentPage+10)}>++</button> 
            <button disabled={currentPage >  pageCount-1} onClick={(e)=>  pageChangedHandler(e,pageCount)}>{pageCount}</button> 
        </div>
    );
}

export default Pagination;