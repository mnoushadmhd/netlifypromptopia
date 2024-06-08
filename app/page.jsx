import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center">AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">AI-powered prompts enhance creativity and efficiency. They intelligently assist with content creation, making tasks easier and more enjoyable!</p>
       
        <Feed />
    </section>
  )
}

export default Home