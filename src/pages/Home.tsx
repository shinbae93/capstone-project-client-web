import {
  CalculatorOutlined,
  CalendarOutlined,
  CodeOutlined,
  DeploymentUnitOutlined,
  ExperimentOutlined,
  LeftOutlined,
  ReadOutlined,
  RightOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import { Button, Card, Carousel, Input, Space, Tooltip } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_AVATAR, DEFAULT_IMG, RoleId } from '../common/constants'
import { AuthContext } from '../context/auth.context'
import { useCoursesQuery } from '../graphql/generated/graphql'
import { CurrencyFormatter } from '../utils/format'
import dayjs from 'dayjs'

const Home = () => {
  const { currentUser } = useContext(AuthContext)
  const carousel = useRef<CarouselRef>(null)

  const { data } = useCoursesQuery({
    variables: {
      queryParams: {
        pagination: {
          limit: 12,
          page: 1,
        },
      },
    },
  })

  return (
    <div>
      {/** Main carousel */}
      <Carousel autoplay pauseOnDotsHover draggable swipeToSlide>
        <div className="relative" key={1}>
          <img src="/carousel-1.jpg" alt="carousel" className="h-carousel w-screen object-cover" />
          <div className="absolute right-[9.2rem] top-[5.4rem] max-w-[29rem] bg-white p-8 shadow-md">
            <p className="text-2xl mb-3 font-bold">Start your teaching career</p>
            <p className="text-sm">
              Join with us and bring your knowledge to many chidren out there. Raise kid, raise
              future.
            </p>
            <Link to={currentUser?.roleId === RoleId.TUTOR ? '' : '/become-teacher'}>
              <Tooltip
                title={
                  currentUser?.roleId === RoleId.TUTOR ? 'You are already a teacher' : undefined
                }
              >
                <Button className="mt-5 text-white" type="primary">
                  <p>Become a Teacher</p>
                </Button>
              </Tooltip>
            </Link>
          </div>
        </div>
        <div className="relative" key={2}>
          <img src="/carousel-2.jpg" alt="carousel2" className="h-carousel w-screen object-cover" />
          <div className="absolute left-[9.2rem] top-[5.4rem] max-w-[29rem] bg-white p-8 shadow-lg">
            <p className="text-2xl mb-3 font-bold">Learning that gets you</p>
            <p className="text-sm">
              Skills for your present (and your future). Get started with us.
            </p>
          </div>
        </div>
      </Carousel>
      {/** Popular courses */}
      <div className="px-28 pt-20">
        <div className="mb-12 flex justify-between items-center">
          <span>
            <p className="text-2xl font-medium leading-10">Popular Courses</p>
            <p className="text-footer text-sm">Limitless learning, more possibilities</p>
          </span>
          <span>
            <span className="pr-1">
              <LeftOutlined
                className="w-[40px] h-[40px] arrow inline-flex items-center justify-center"
                onClick={() => carousel.current?.prev()}
              />
            </span>
            <span className="pl-1">
              <RightOutlined
                className="w-[40px] h-[40px] arrow inline-flex items-center justify-center"
                onClick={() => carousel.current?.next()}
              />
            </span>
          </span>
        </div>
        <Carousel
          draggable
          swipeToSlide
          dots={false}
          ref={carousel}
          slidesPerRow={4}
          slidesToScroll={1 / 4}
          speed={700}
          className="mx-[-1rem]"
        >
          {data?.courses?.items?.map((item) => (
            <div className="px-4" key={item.id}>
              <Card
                bordered
                bodyStyle={{
                  padding: 0,
                }}
                cover={
                  <img
                    alt="thumbnail"
                    src={item.thumbnail || DEFAULT_IMG}
                    className="h-[220px] object-contain rounded-sm"
                  />
                }
                actions={[
                  <div className="flex flex-row justify-between px-3">
                    <Tooltip title="Start date">
                      <div className="flex flex-row">
                        <CalendarOutlined key="calendar" className="self-center pr-1" />
                        <p>{`${dayjs(item.startDate).format('DD/MM/YYYY')}`}</p>
                      </div>
                    </Tooltip>
                    <Tooltip title="Fee">
                      <p className="text-redpink font-semibold">
                        ${CurrencyFormatter.format(item.fee)}
                      </p>
                    </Tooltip>
                  </div>,
                ]}
              >
                <div className="mt-[-50px]">
                  <span className="overflow-hidden flex flex-row justify-center">
                    <img
                      src={item?.user?.avatar || DEFAULT_AVATAR}
                      alt="avatar"
                      className="h-[42px] w-[42px] rounded-full box-content border-4 border-solid border-white"
                    />
                  </span>
                  <div className="mb-5">
                    <p className="text-sm text-center text-footer mb-2">
                      {item?.user?.fullName || 'John Doe'}
                    </p>
                    <p className="text-sm font-medium text-center">Teacher</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Carousel>
        <div className="flex justify-center items-center my-10">
          <Link to="/courses">
            <Button className="bg-primary rounded-sm" size="large" type="ghost">
              <p className="font-medium px-3">VIEW ALL</p>
            </Button>
          </Link>
        </div>
      </div>
      {/** Introduction */}
      <div className="flex flex-row justify-around bg-[#F3F3F3] w-screen pt-28">
        <div className="flex flex-row gap-14">
          <img
            src="https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/06/image-cta-min-1.png"
            alt="home-img"
            className="mt-[-3rem]"
          />
          <div>
            <p className="">Limitless learning, more possibilities</p>
            <p>Answer a few questions for your top picks</p>
          </div>
        </div>
        <Button type="primary" size="large" className="px-6">
          <p className="text-black font-medium">JOIN FOR FREE</p>
        </Button>
      </div>
      {/** Top categories */}
      <div
        className="w-screen mt-[-2rem]"
        style={{
          backgroundImage:
            'url(https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/06/bg-category-section.jpg)',
        }}
      >
        <div className="px-28 py-32 flex flex-row justify-evenly">
          <p className="text-white text-3xl font-semibold">
            Top <br /> Categories
          </p>
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-white flex flex-row justify-start items-center py-2 pl-5 w-60 rounded-md">
              <CalculatorOutlined className="text-2xl mr-3 text-lighterBlack" />
              <p className="font-medium">Toán</p>
            </div>
            <div className="bg-white flex flex-row justify-start items-center py-2 pl-5 w-60 rounded-md">
              <ExperimentOutlined className="text-2xl mr-3 text-lighterBlack" />
              <p className="font-medium">Hóa Học</p>
            </div>
            <div className="bg-white flex flex-row justify-start items-center py-2 pl-5 w-60 rounded-md">
              <RocketOutlined className="text-2xl mr-3 text-lighterBlack" />
              <p className="font-medium">Vật Lý</p>
            </div>
            <div className="bg-white flex flex-row justify-start items-center py-2 pl-5 w-60 rounded-md">
              <DeploymentUnitOutlined className="text-2xl mr-3 text-lighterBlack" />
              <p className="font-medium">Sinh Học</p>
            </div>
            <div className="bg-white flex flex-row justify-start items-center py-2 pl-5 w-60 rounded-md">
              <CodeOutlined className="text-2xl mr-3 text-lighterBlack" />
              <p className="font-medium">Tin học</p>
            </div>
            <div className="bg-white flex flex-row justify-start items-center py-2 pl-5 w-60 rounded-md">
              <ReadOutlined className="text-2xl mr-3 text-lighterBlack" />
              <p className="font-medium">Tiếng Anh</p>
            </div>
          </div>
        </div>
      </div>
      {/** Why choose us */}
      <div className="bg-[#F3F3F3]">
        <div className="px-28 py-16 flex flex-col justify-center items-center">
          <p className="text-[#333333] font-semibold text-3xl">Why Choose Us?</p>
          <p className="text-sm text-footer mt-2">A choice that makes the difference.</p>
          <div className="flex flex-row gap-8 py-14">
            <div className="p-14 bg-white flex flex-col justify-center items-center box-border">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  viewBox="0 0 75 75"
                  fill="none"
                >
                  <path
                    d="M25.721 37.0337C25.1828 36.7398 24.5092 36.938 24.2155 37.4758L20.7048 43.9057L16.4327 36.0808C16.2382 35.7246 15.8648 35.5029 15.4589 35.5029C15.0532 35.5029 14.6796 35.7246 14.4852 36.0807L8.00052 47.9578C7.99949 47.9597 7.99847 47.9614 7.99744 47.9633L6.00116 51.6196C5.70745 52.1575 5.9055 52.8314 6.44325 53.125C6.61214 53.2173 6.79422 53.2609 6.97396 53.2609C7.36668 53.2609 7.74725 53.0519 7.94866 52.6829L9.24447 50.3097L10.5325 51.5978C10.9658 52.0311 11.6682 52.0311 12.1015 51.5978L12.7963 50.903L14.6745 52.7812C14.8911 52.9979 15.175 53.1061 15.4589 53.1061C15.5385 53.1061 15.6177 53.0967 15.6958 53.0797L8.42005 66.4057C8.1265 66.9436 8.3244 67.6176 8.86214 67.9111C9.03104 68.0034 9.21312 68.0471 9.39285 68.0471C9.78558 68.0471 10.1661 67.838 10.3676 67.469L26.163 38.5388C26.4568 38.0014 26.2588 37.3274 25.721 37.0337ZM17.3373 48.5499L15.4591 50.4281L13.5808 48.5499C13.1475 48.1166 12.4451 48.1166 12.0118 48.5499L11.3171 49.2446L10.3528 48.2803L15.4591 38.9277L19.4408 46.221L18.3354 48.2458C17.9853 48.1772 17.6086 48.2786 17.3373 48.5499Z"
                    fill="#FFB606"
                  ></path>
                  <path
                    d="M5.0222 55.7272C4.48431 55.4335 3.81033 55.6316 3.51678 56.1693L0.135921 62.3615C-0.15778 62.8994 0.0402665 63.5734 0.578011 63.8669C0.746761 63.9592 0.928987 64.0029 1.10872 64.0029C1.50145 64.0029 1.88201 63.7938 2.08343 63.4248L5.46429 57.2327C5.75799 56.6949 5.55994 56.0209 5.0222 55.7272Z"
                    fill="#FFB606"
                  ></path>
                  <path
                    d="M74.8644 56.2966L67.0029 41.8979C67.0022 41.8966 67.0014 41.8953 67.0007 41.8938L64.7522 37.7755C64.4585 37.2376 63.7845 37.0396 63.2467 37.3334C62.7089 37.627 62.511 38.301 62.8045 38.8389L64.6479 42.215L63.6836 43.1793L62.9888 42.4846C62.5553 42.0513 61.8531 42.0513 61.4196 42.4846L59.5416 44.3628L57.6635 42.4846C57.23 42.0513 56.5278 42.0513 56.0944 42.4846L55.3996 43.1793L54.4348 42.2145L59.5414 32.8623L60.3159 34.2807C60.6094 34.8185 61.2833 35.0164 61.8213 34.7229C62.3592 34.4294 62.5571 33.7553 62.2635 33.2175L60.5154 30.0157C60.321 29.6594 59.9475 29.4378 59.5416 29.4378C59.1358 29.4378 58.7624 29.6594 58.5677 30.0155L52.6395 40.8721L38.6097 15.1753V11.3906H50.2221C50.6328 11.3906 51.0099 11.1639 51.2022 10.801C51.3947 10.4382 51.371 9.99888 51.1405 9.65889L48.4556 5.69531L51.1405 1.73174C51.371 1.39175 51.3947 0.952441 51.2022 0.5896C51.0097 0.226904 50.6327 0 50.2221 0H37.5004C36.8876 0 36.3909 0.496728 36.3909 1.10947V15.1753L26.6964 32.9314C26.4028 33.4693 26.6007 34.1433 27.1385 34.4369C27.6767 34.7309 28.3504 34.5327 28.6439 33.9948L31.2858 29.1561L32.5738 30.4441C33.0071 30.8774 33.7095 30.8774 34.1428 30.4441L34.8376 29.7494L36.7158 31.6276C36.9324 31.8442 37.2163 31.9525 37.5002 31.9525C37.7841 31.9525 38.0681 31.8441 38.2848 31.6276L40.1629 29.7494L40.8576 30.4441C41.2911 30.8774 41.9933 30.8774 42.4268 30.4441L43.7148 29.1561L64.6328 67.4692C64.8343 67.8382 65.2148 68.0473 65.6076 68.0473C65.7872 68.0473 65.9694 68.0035 66.1382 67.9113C66.6761 67.6178 66.874 66.9438 66.5804 66.4059L55.3606 45.8559C55.6574 45.8663 55.9575 45.7594 56.1841 45.5328L56.8789 44.838L58.757 46.7162C58.9736 46.9329 59.2577 47.0411 59.5416 47.0411C59.8255 47.0411 60.1095 46.9327 60.3261 46.7162L62.2042 44.838L62.899 45.5328C63.3324 45.9661 64.0347 45.9661 64.4681 45.5328L65.7562 44.2447L72.9168 57.3598C73.1183 57.7288 73.4987 57.9378 73.8916 57.9378C74.0712 57.9378 74.2534 57.894 74.4222 57.8019C74.9601 57.5084 75.158 56.8345 74.8644 56.2966ZM46.1971 6.31772L48.1304 9.17183H38.6097V2.21909H48.1304L46.1971 5.07319C45.9425 5.44893 45.9425 5.94185 46.1971 6.31772ZM41.6424 28.0907L40.9476 27.3959C40.5141 26.9626 39.8119 26.9626 39.3784 27.3959L37.5004 29.2742L35.6221 27.3959C35.1888 26.9626 34.4864 26.9626 34.0531 27.3959L33.3584 28.0907L32.3941 27.1264L37.5004 17.7738L42.6067 27.1264L41.6424 28.0907Z"
                    fill="#FFB606"
                  ></path>
                  <path
                    d="M44.1833 48.8165H46.9666C47.3968 48.8165 47.7882 48.5677 47.971 48.1782C48.1539 47.7887 48.0948 47.3288 47.8197 46.9979L38.3523 35.6074C38.1415 35.3538 37.8289 35.207 37.4992 35.207C37.1694 35.207 36.8567 35.3537 36.646 35.6074L27.1786 46.9979C26.9035 47.3288 26.8446 47.7887 27.0273 48.1782C27.21 48.5677 27.6015 48.8165 28.0317 48.8165H30.8151L23.1261 73.561C23.0215 73.8978 23.0832 74.2642 23.2922 74.5482C23.5013 74.8322 23.8329 74.9998 24.1856 74.9998H50.8127C51.1653 74.9998 51.4971 74.8322 51.7061 74.5482C51.9153 74.2643 51.9768 73.8978 51.8722 73.561L44.1833 48.8165ZM25.6921 72.7809L33.3811 48.0363C33.4856 47.6995 33.424 47.3332 33.2149 47.0491C33.0059 46.7651 32.6743 46.5975 32.3215 46.5975H30.3964L37.4992 38.0522L44.6018 46.5975H42.6767C42.3241 46.5975 41.9923 46.7651 41.7833 47.0491C41.5741 47.333 41.5125 47.6995 41.6171 48.0363L49.3061 72.7809H25.6921Z"
                    fill="#FFB606"
                  ></path>
                </svg>
              </span>
              <p className="font-semibold text-lg text-[#333333] my-4 mt-8">Highly Experienced</p>
              <p className="text-center text-sm text-[#606060] w-[250px]">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur
              </p>
            </div>
            <div className="p-14 bg-white flex flex-col justify-center items-center box-border">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  viewBox="0 0 75 75"
                  fill="none"
                >
                  <path
                    d="M65.2008 11.8083H60.5713V4.76074C60.5713 2.13574 58.4357 0 55.8105 0H19.1895C16.5643 0 14.4287 2.13574 14.4287 4.76074V8.821C14.4737 10.2735 16.5814 10.2725 16.626 8.821V4.76074C16.626 3.34731 17.776 2.19727 19.1895 2.19727H26.4715L27.2354 4.33887C27.6533 5.51118 28.7706 6.29883 30.0152 6.29883H44.9846C46.2293 6.29883 47.3465 5.51118 47.7646 4.33887L48.5285 2.19727H55.8105C57.224 2.19727 58.374 3.34731 58.374 4.76074V11.8083H43.9301C41.8787 11.8083 40.21 13.478 40.21 15.5307V29.3473C40.21 31.3998 41.8789 33.0697 43.9301 33.0697H50.8496V35.828C50.8496 36.3464 51.1548 36.8193 51.6272 37.0326C52.0963 37.2451 52.655 37.1635 53.0448 36.8197L57.3 33.0697H58.374V64.4893H48.6948C47.2422 64.5343 47.2433 66.642 48.6948 66.6866H58.374V70.2393C58.374 71.6527 57.224 72.8027 55.8105 72.8027H19.1895C17.776 72.8027 16.626 71.6527 16.626 70.2393V66.6866H43.4077C44.8603 66.6416 44.8592 64.5338 43.4077 64.4893H16.626V53.9789H17.6999L21.9552 57.7289C22.3452 58.0729 22.9036 58.1543 23.3728 57.9417C23.8452 57.7283 24.1504 57.2556 24.1504 56.7372V53.9789H31.0699C33.1213 53.9789 34.79 52.3091 34.79 50.2564V36.4399C34.79 34.3874 33.1211 32.7174 31.0699 32.7174H16.626V14.0536C16.581 12.601 14.4732 12.6021 14.4287 14.0536V32.7174H9.79922C7.74785 32.7174 6.0791 34.3872 6.0791 36.4399V50.2564C6.0791 52.309 7.748 53.9789 9.79922 53.9789H14.4287V70.2393C14.4287 72.8643 16.5643 75 19.1895 75H55.8105C58.4357 75 60.5713 72.8643 60.5713 70.2393V33.0696H65.2008C67.2521 33.0696 68.9209 31.3998 68.9209 29.3471V15.5306C68.9209 13.478 67.252 11.8083 65.2008 11.8083ZM45.6949 3.60088C45.5881 3.90044 45.3026 4.10156 44.9846 4.10156H30.0152C29.6972 4.10156 29.4117 3.90029 29.3049 3.60073L28.8044 2.19727H46.1958L45.6949 3.60088ZM8.27637 50.2563V36.4397C8.27637 35.5988 8.95957 34.9146 9.79922 34.9146H31.0698C31.9094 34.9146 32.5926 35.5986 32.5926 36.4397V50.2563C32.5926 51.0973 31.9094 51.7815 31.0698 51.7815H23.2743C22.5457 51.7815 21.9529 52.3743 21.9529 53.1031V54.798L18.9045 52.1118C18.6631 51.8987 18.3526 51.7815 18.0306 51.7815H9.79922C8.95957 51.7815 8.27637 51.0974 8.27637 50.2563ZM66.7236 29.3473C66.7236 30.1882 66.0404 30.8725 65.2008 30.8725H56.9692C56.6473 30.8725 56.3369 30.9898 56.0956 31.2025L53.047 33.889V32.194C53.047 31.4653 52.4542 30.8725 51.7255 30.8725H43.9301C43.0904 30.8725 42.4072 30.1884 42.4072 29.3473V15.5307C42.4072 14.6897 43.0904 14.0055 43.9301 14.0055H65.2006C66.0403 14.0055 66.7235 14.6896 66.7235 15.5307V29.3473H66.7236Z"
                    fill="#FFB606"
                  ></path>
                  <path
                    d="M54.2919 27.3196H54.2904C52.8382 27.3648 52.8401 29.4725 54.2919 29.5168C55.7441 29.472 55.7437 27.3641 54.2919 27.3196Z"
                    fill="#FFB606"
                  ></path>
                  <path
                    d="M54.3738 16.2026C52.2829 16.1579 50.4888 17.6884 50.2002 19.7559C50.0317 20.5645 50.3268 21.3991 51.2591 21.4293C52.0352 21.4173 52.4046 20.7735 52.3764 20.0598C52.5111 19.0933 53.3528 18.3753 54.3297 18.3994C55.3367 18.4197 56.1662 19.2222 56.2184 20.2265C56.2462 20.763 56.0587 21.2721 55.6903 21.6602C55.3214 22.0487 54.8241 22.2625 54.2896 22.2625C53.6827 22.2625 53.191 22.7544 53.191 23.3612V25.4541C53.2359 26.9067 55.3437 26.9056 55.3882 25.4541V24.3095C56.1051 24.1106 56.7648 23.7198 57.2837 23.1731C58.0712 22.3437 58.4722 21.2568 58.4128 20.1127C58.3011 17.9635 56.5272 16.246 54.3738 16.2026Z"
                    fill="#FFB606"
                  ></path>
                  <path
                    d="M19.2883 47.9069C19.5971 47.9353 19.9079 47.83 20.1361 47.617L26.8885 41.3333C27.9212 40.3108 26.4845 38.7685 25.3915 39.7249L19.5366 45.1736L16.7405 41.4197C16.3782 40.9331 15.6899 40.8324 15.2031 41.1948C14.7166 41.5574 14.6159 42.2456 14.9784 42.7322L18.5066 47.4692C18.6931 47.7195 18.9774 47.8788 19.2883 47.9069Z"
                    fill="#FFB606"
                  ></path>
                  <path
                    d="M40.5969 45.4988H52.2742C53.7267 45.4538 53.7257 43.346 52.2742 43.3015H40.5969C39.1442 43.3466 39.1454 45.4544 40.5969 45.4988Z"
                    fill="#FFB606"
                  ></path>
                  <path
                    d="M40.5969 50.1487H52.2742C53.7267 50.1037 53.7257 47.9959 52.2742 47.9514H40.5969C39.1442 47.9964 39.1454 50.1042 40.5969 50.1487Z"
                    fill="#FFB606"
                  ></path>
                  <path
                    d="M40.5969 54.7986H49.0666C50.5192 54.7536 50.5181 52.6458 49.0666 52.6013H40.5969C39.1442 52.6463 39.1454 54.7541 40.5969 54.7986Z"
                    fill="#FFB606"
                  ></path>
                </svg>
              </span>
              <p className="font-semibold text-lg text-[#333333] my-4 mt-8">
                Question, Quiz & Course
              </p>
              <p className="text-center text-sm text-[#606060] w-[250px]">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur
              </p>
            </div>
            <div className="p-14 bg-white flex flex-col justify-center items-center box-border">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  viewBox="0 0 75 75"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2575_9428)">
                    <path
                      d="M61.931 23.7031H56.4773V17.8928C56.4773 14.5632 55.2246 11.3914 52.9499 8.96191C52.527 8.51016 51.818 8.48701 51.3665 8.90991C50.9149 9.33281 50.8916 10.0417 51.3145 10.4931C53.199 12.506 54.237 15.1339 54.237 17.8928V23.7031H31.4423C24.236 23.7031 18.3732 29.566 18.3732 36.7723V40.7798H16.6187C15.9207 40.7798 15.2643 41.0517 14.7705 41.5453L8.82495 47.4908V41.5099C8.82495 40.5936 8.33437 39.7326 7.54438 39.2629C4.2728 37.3178 2.24033 33.7497 2.24033 29.9512V17.8928C2.24033 11.9218 7.09805 7.06406 13.069 7.06406H43.4083C44.8078 7.06406 46.1691 7.32671 47.4543 7.84497C48.0281 8.07598 48.6809 7.79853 48.9122 7.2249C49.1435 6.65112 48.8659 5.99839 48.2921 5.76709C46.7395 5.14102 45.0962 4.82373 43.4083 4.82373H13.069C5.86274 4.82373 0 10.6865 0 17.8928V29.9512C0 34.5359 2.45215 38.8418 6.39946 41.1886C6.51372 41.2566 6.58462 41.3796 6.58462 41.51V48.0318C6.58462 48.8502 7.07314 49.5813 7.8293 49.8946C8.33394 50.1372 9.36431 50.1022 10.0267 49.4577L16.3545 43.1297C16.4251 43.0591 16.5189 43.0203 16.6187 43.0203H18.3732V48.8306C18.3732 50.5945 18.7189 52.3062 19.4007 53.9181C19.6417 54.4878 20.2989 54.754 20.8688 54.5134C21.4386 54.2725 21.705 53.6152 21.4642 53.0454C20.9 51.7112 20.6137 50.2932 20.6137 48.8307V36.7724C20.6137 30.8013 25.4714 25.9436 31.4424 25.9436H61.931C67.902 25.9436 72.7597 30.8013 72.7597 36.7724V48.8307C72.7597 52.644 70.8098 56.1051 67.5436 58.0894C66.7739 58.5571 66.2956 59.4107 66.2956 60.3168V67.6229L59.0977 60.4248C58.604 59.9312 57.9476 59.6593 57.2495 59.6593H31.4423C28.7249 59.6593 26.1264 58.6485 24.1252 56.8134C23.6694 56.3955 22.9608 56.4259 22.5425 56.8818C22.1243 57.3378 22.1549 58.0463 22.6109 58.4646C25.0263 60.6798 28.1625 61.8998 31.4421 61.8998H57.2492C57.3475 61.8998 57.4437 61.9396 57.5131 62.0092L65.0936 69.5896C65.6789 70.0395 66.2511 70.3872 67.2908 70.0266C68.047 69.7132 68.5355 68.9821 68.5355 68.1637V60.3167C68.5355 60.1879 68.6011 60.068 68.7066 60.004C72.6475 57.61 75 53.4331 75 48.8306V36.7723C75 29.566 69.1373 23.7031 61.931 23.7031Z"
                      fill="#FFB606"
                    ></path>
                    <path
                      d="M43.5253 50.4179C42.8685 49.4898 41.6719 48.8675 40.3071 48.8675C38.2377 48.8675 36.5543 50.2979 36.5543 52.0562C36.5543 53.8143 38.2378 55.2447 40.3071 55.2447C42.1229 55.2447 43.6412 54.1433 43.9862 52.6855C45.6385 51.9895 46.9393 50.6028 47.5039 48.8483C49.1398 48.4758 50.3648 47.0104 50.3648 45.2631V41.2238C50.3648 39.5371 49.2231 38.1129 47.6722 37.6811C47.3071 35.4312 46.2015 33.3668 44.5065 31.8066C42.6152 30.0657 40.1572 29.1069 37.5853 29.1069C32.5241 29.1069 28.2908 32.7525 27.4973 37.6812C25.9469 38.1134 24.8057 39.5374 24.8057 41.2237V45.263C24.8057 47.2909 26.4555 48.9408 28.4834 48.9408C30.5114 48.9408 32.1612 47.2909 32.1612 45.263V41.2237C32.1612 39.6424 31.158 38.2911 29.7546 37.7725C30.4809 34.0613 33.7251 31.3473 37.5853 31.3473C41.3965 31.3473 44.6815 34.1088 45.4129 37.7737C44.0111 38.293 43.0093 39.6434 43.0093 41.2237V45.263C43.0093 46.7577 43.9061 48.0462 45.1896 48.6208C44.8334 49.3861 44.2477 50.0111 43.5253 50.4179ZM40.3071 53.0045C39.4157 53.0045 38.7946 52.5049 38.7946 52.0563C38.7946 51.6078 39.4157 51.108 40.3071 51.108C41.1984 51.108 41.8197 51.6078 41.8197 52.0563C41.8197 52.5049 41.1983 53.0045 40.3071 53.0045ZM29.9209 45.2633C29.9209 46.0559 29.2761 46.7007 28.4834 46.7007C27.6908 46.7007 27.046 46.0559 27.046 45.2633V41.224C27.046 40.4313 27.6908 39.7865 28.4834 39.7865C29.2761 39.7865 29.9209 40.4313 29.9209 41.224V45.2633ZM45.2496 41.224C45.2496 40.4313 45.8944 39.7865 46.6871 39.7865C47.4797 39.7865 48.1245 40.4313 48.1245 41.224V45.2633C48.1245 46.0559 47.4797 46.7007 46.6871 46.7007C45.8944 46.7007 45.2496 46.0559 45.2496 45.2633V41.224Z"
                      fill="#FFB606"
                    ></path>
                    <path
                      d="M53.2754 35.4554H62.1979C62.8166 35.4554 63.3181 34.954 63.3181 34.3353C63.3181 33.7165 62.8166 33.2151 62.1979 33.2151H53.2754C52.6568 33.2151 52.1553 33.7165 52.1553 34.3353C52.1553 34.954 52.6568 35.4554 53.2754 35.4554Z"
                      fill="#FFB606"
                    ></path>
                    <path
                      d="M53.2754 40.4701H60.1554C60.774 40.4701 61.2755 39.9687 61.2755 39.3499C61.2755 38.7312 60.774 38.2297 60.1554 38.2297H53.2754C52.6568 38.2297 52.1553 38.7312 52.1553 39.3499C52.1553 39.9687 52.6568 40.4701 53.2754 40.4701Z"
                      fill="#FFB606"
                    ></path>
                    <path
                      d="M11.0207 21.1456C11.943 21.1456 12.6907 20.3978 12.6907 19.4755C12.6907 18.5531 11.943 17.8054 11.0207 17.8054C10.0983 17.8054 9.35059 18.5531 9.35059 19.4755C9.35059 20.3978 10.0983 21.1456 11.0207 21.1456Z"
                      fill="#FFB606"
                    ></path>
                    <path
                      d="M16.0783 21.1456C17.0006 21.1456 17.7483 20.3978 17.7483 19.4755C17.7483 18.5531 17.0006 17.8054 16.0783 17.8054C15.1559 17.8054 14.4082 18.5531 14.4082 19.4755C14.4082 20.3978 15.1559 21.1456 16.0783 21.1456Z"
                      fill="#FFB606"
                    ></path>
                    <path
                      d="M21.1066 21.1456C22.0289 21.1456 22.7767 20.3978 22.7767 19.4755C22.7767 18.5531 22.0289 17.8054 21.1066 17.8054C20.1842 17.8054 19.4365 18.5531 19.4365 19.4755C19.4365 20.3978 20.1842 21.1456 21.1066 21.1456Z"
                      fill="#FFB606"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_2575_9428">
                      <rect width="75" height="75" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <p className="font-semibold text-lg text-[#333333] my-4 mt-8">Dedicated Support</p>
              <p className="text-center text-sm text-[#606060] w-[250px]">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur
              </p>
            </div>
          </div>
          <Button className="bg-primary rounded-sm" size="large" type="ghost">
            <p className="font-medium px-3">LEARN MORE</p>
          </Button>
        </div>
      </div>
      {/** Sponsors */}
      <div>
        <div className="px-28 py-20 grid grid-cols-5">
          <div>
            <img
              src="https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/06/icon-partner-1-1.png"
              className="opacity-70"
            />
          </div>
          <div>
            <img src="https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/06/icon-partner-2-1.png" />
          </div>
          <div>
            <img src="https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/06/icon-partner-3-1.png" />
          </div>
          <div>
            <img src="https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/06/icon-partner-4-1.png" />
          </div>
          <div>
            <img src="https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/06/icon-partner-5-1.png" />
          </div>
        </div>
      </div>
      {/** Subcribe mail for more info */}
      <div className="bg-[#F6F6F6]">
        <div
          className="mx-28 py-24 bg-no-repeat bg-left"
          style={{
            backgroundImage:
              'url(https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/06/bg-mail.png)',
          }}
        >
          <div className="grid grid-cols-2 gap-32">
            <div className="h-full">
              <p className="pl-28 text-sm text-footer font-semibold">
                Subscribe now and receive weekly newsletter with educational materials, new courses,
                interesting posts, popular books and much more!
              </p>
            </div>
            <div>
              <Space.Compact style={{ width: '90%' }}>
                <Input
                  placeholder={'Your email'}
                  className="bg-white shadow-sm hover:border-primary focus:border-primary"
                  style={{
                    background:
                      '#fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAMAAACgaw2xAAAAdVBMVEVMaXHMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw+R8MhAAAAJnRSTlMAovqp9Cm63QM7Cqbn8uKG6c0GVOiMUwlm9x2tIJtyWJq2M8UTSQAt0usAAACdSURBVHhebcnpEoMgDIXRICpQV7S2Lt2X+/6PWGvNTOpwfzDhO8Rz9dlSYK4AlA13IbIrExAXz0nhXrDITj0mxyI7PZDTLJnddGoGjFKaAtPvfKIlKSnyZDk6dCRlx3JFWb1fX9H/MkYAYDKNrZz6m18QyIhln6ynu2gDDI0UXoWoJZIiO++Yok64H7hK6bhrs64E4uUdvj9NHsH5D86uE93k9eHmAAAAAElFTkSuQmCC) no-repeat center right 20px',
                  }}
                />
                <Button type="primary" className="h-[44px] px-5">
                  <p className="font-semibold">SUBSCRIBE</p>
                </Button>
              </Space.Compact>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
