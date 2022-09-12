import React from 'react';

export default function Meme() {

    const [meme, setMeme] = React.useState({
        leftText: "",
        rightText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    })


    console.log("MC loaded")
    const [allMemeImages, setAllMemeImages] = React.useState([])

    function getMemeImage() {
        //const arrayOfMemes = allMemeImages.data.memes
        const randomNumber = Math.floor(Math.random() * allMemeImages.length) //generates a random number
        //using setMemeImage and the random number - retrieve a random url of the image from the arrayOfMemes and set the url to the image
        //arrayOfMemes[randomNumber].url
        setMeme(prevMeme => ({

            ...prevMeme,
            randomImage: `${allMemeImages[randomNumber].url}`

        }))
    }


    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemeImages(data.data.memes)

        }
        getMemes()
    }, [])


    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => {

            return {

                ...prevMeme,
                [name]: value

            }


        })


    }

    return (<main>
        <div className="form">
            <input type="text" className="form--input" name="leftText" value={meme.leftText} onChange={handleChange}></input>
            <input type="text" className="form--input" name="rightText" value={meme.rightText} onChange={handleChange}></input>
            <button className="form--button" onClick={getMemeImage}>Get a new meme image 🖼</button>
        </div>
        <div className="container">
            <img src={meme.randomImage} className="meme--img" alt="Meme" />
            <div class="meme--text left--text">{meme.leftText}</div>
            <div class="meme--text right--text">{meme.rightText}</div>
        </div>
    </main>)



}