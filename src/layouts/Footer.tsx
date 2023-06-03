import {
  EnvironmentOutlined,
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneOutlined,
  TwitterSquareFilled,
} from '@ant-design/icons'
import { Divider } from 'antd'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-[#111111] py-10">
      <div className="px-48">
        <div className="flex flex-row justify-between text-white mt-10">
          <div className="flex flex-col pr-14">
            <div className="mb-10">
              <img src="../../logo-white-text.svg" alt="logo" className="w-40" />
            </div>
            <span className="py-2">
              <span>
                <span className="w-5 text-center inline-block mr-2">
                  <PhoneOutlined className={`text-primary text-xl align-baseline`} />
                </span>
              </span>
              <p className="text-footer inline-block text-base">800 388 80 90</p>
            </span>
            <span className="py-2">
              <span className="w-5 text-center inline-block mr-2">
                <EnvironmentOutlined className="text-primary text-xl align-baseline" />
              </span>
              <p className="text-footer inline-block text-base">
                58 Howard Street #2 San Francisco
              </p>
            </span>
            <span className="py-2">
              <span className="w-5 text-center inline-block mr-2">
                <MailOutlined className="text-primary text-xl align-baseline" />
              </span>
              <p className="text-footer inline-block text-base">contact@edusm.com</p>
            </span>
            <span className="py-2">
              <span className="w-10 inline-block mr-3">
                <FacebookFilled className="text-primary text-xl align-baseline" />
              </span>
              <span className="w-10 inline-block mr-3">
                <TwitterSquareFilled className="text-primary text-xl align-baseline" />
              </span>
              <span className="w-10 inline-block mr-3">
                <InstagramFilled className="text-primary text-xl align-baseline" />
              </span>
              <span className="w-10 inline-block mr-3">
                <LinkedinFilled className="text-primary text-xl align-baseline" />
              </span>
            </span>
          </div>
          <div className="flex flex-col pr-10">
            <p className="text-xl font-semibold pb-12">Company</p>
            <p className="text-footer pb-5 text-base">About</p>
            <p className="text-footer pb-5 text-base">Blog</p>
            <p className="text-footer pb-5 text-base">Contact</p>
            <p className="text-footer pb-5 text-base">Become a Teacher</p>
          </div>
          <div className="flex flex-col pr-10">
            <p className="text-xl font-semibold pb-12">Links</p>
            <p className="text-footer pb-5 text-base">Courses</p>
            <p className="text-footer pb-5 text-base">Events</p>
            <p className="text-footer pb-5 text-base">Gallery</p>
            <p className="text-footer pb-5 text-base">FAQs</p>
          </div>
          <div className="flex flex-col pr-10">
            <p className="text-xl font-semibold pb-12">Support</p>
            <p className="text-footer pb-5 text-base">Documentation</p>
            <p className="text-footer pb-5 text-base">Forums</p>
            <p className="text-footer pb-5 text-base">Language Packs</p>
            <p className="text-footer pb-5 text-base">Release Status</p>
          </div>
          <div className="flex flex-col pr-10">
            <p className="text-xl font-semibold pb-12">Recommend</p>
            <p className="text-footer pb-5 text-base">IELTS</p>
            <p className="text-footer pb-5 text-base">TOEIC</p>
            <p className="text-footer pb-5 text-base">Math</p>
            <p className="text-footer pb-5 text-base">Physics</p>
          </div>
        </div>
        <Divider
          plain
          type="horizontal"
          style={{ backgroundColor: '#999999', margin: '40px 0' }}
        ></Divider>
        <div className="text-footer flex flex-row justify-between">
          <p className="px-5">© 2023 Edusm, inc.</p>
          <div>
            <span className="p-5 text-base">
              <Link to="/">Privacy</Link>
            </span>
            <span className="p-5 text-base">
              <Link to="/">Terms</Link>
            </span>
            <span className="p-5 text-base">
              <Link to="/">Sitemap</Link>
            </span>
            <span className="p-5 text-base">
              <Link to="/">Purchase</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
