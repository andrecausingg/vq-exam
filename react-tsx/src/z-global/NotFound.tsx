import notFoundImg from '../assets/images/404/404.svg'

const NotFound: React.FC = () => {
  return (
    <>
      {/* Container */}
      <div className='mx-auto md:max-w-3xl xl:max-w-6xl flex flex-col items-center justify-center h-screen'>
        <img src={notFoundImg} alt="Not Found Image Percival Estimate" className='w-96'/>
        <h1 className=' text-4xl font-bold text-center'>Sorry, the page you are looking for cannot be found. Please check the URL and try again.</h1>
      </div>
    </>
  )
}

export default NotFound