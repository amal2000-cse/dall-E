import React, { useEffect, useState } from 'react'
import { Loader,Card,FormField } from '../components'

const RenderCards=({data,title})=>{
    if(data?.length > 0){
        return (
            data.map((post)=>
     //here we are passing all of the values from the post to the Card

            <Card key={post._id} {...post}/>)
        );
    }
    return(
        <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
            {title}
        </h2>
    )

}

const Home = () => {

    const [loading,setLoading]=useState(false);
    //[]
    const [allPosts,setAllPosts]=useState(null);
    const [searchText, setSearchText]=useState('');
    const [searchedResults, setSearchedResults] = useState(null)
    const [searchTimeout, setsearchTimeout] = useState(null)

    // console.log(allPosts)
    //this will only be called only once when the compenent loads
    useEffect(()=>{
        const fetchPosts = async()=>{
            setLoading(true);

            try {
                const response=await fetch('http://localhost:8080/api/v1/post',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                    },
                })

                if(response.ok){
                    const result=await response.json();
                    //to show the newest post at the top we are using .reverse
                    setAllPosts(result.data.reverse());
                }
            } catch (error) {
                alert(error)
            }finally{
                setLoading(false)
            } 
        }
        fetchPosts();
    },[]);

    //now this is for handling search
    const handleSearchChange=(e)=>{
        //this will allow us to clear the searchResults everytime we type something new
        clearTimeout(searchTimeout)
        setSearchText(e.target.value);
        //this wont be filtering based on each key pressed
        //instead of that we will provide a interval within that interval whatever is pressed we will filtering that words

        setsearchTimeout(
            setTimeout(() => {
                const searchResults=allPosts.filter((item)=>item.name.toLowerCase()
                .includes(searchText.toLowerCase()) || item.prompt.toLowerCase()
                .includes(searchText.toLowerCase()));
    
                setSearchedResults(searchResults);
            }, 500)
        );

    }


  return (
    <section className='max-w-7xl mx-auto'>
        <div>
            <h1 className='font-extrabold text-[#222328] text-[32px] '>The Community Showcase</h1>
            <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
                Browser through a collection of imaginative and visually stunning images generated by DALL-E AI
            </p>
        </div>

        <div className='mt-16'>
            <FormField 
               labelName="Search posts"
               type="text"
               name="text"
               placeholder="Search posts"
               value={searchText}
               handleChange={handleSearchChange}
            
            />
        </div>

        <div className="mt-10">
            {loading ? (
                <div className='flex justify-center items-center'>
                    <Loader/>
                </div>
                ):(
                <>
                 {/* if there is a searchText then we can show a h2 tag */}
                  {searchText &&(
                    <h2 className='font-medium text-[#666e75] text-xl mb-3'>Showing results for <span className='text-[#222328]'>{searchText}</span></h2>
                  )}

                  {/* here we will be rendering through all the images */}
                  <div className="grid lg:grid-cols-4 sm:grid-cols-3
                  xs:grid-cols-2 grid-cols-1 gap-3">
                    
                    {/* first we will check if searchText exits or not if it exits */}
                    {searchText?(
                        <RenderCards data={searchedResults} title="No search results found"/>
                    ):(
                       <RenderCards data={allPosts} title="No posts found"/> 
                    )}

                  </div>

                </>
             )}
        </div>
    </section>
  )
}

export default Home