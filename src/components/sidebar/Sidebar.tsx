import settings from "../../assets/sidebar/settings.svg"
import add from "../../assets/sidebar/add.svg"
import turing from "../../assets/sidebar/turing.svg"
import search from "../../assets/sidebar/search.svg"
import updates from "../../assets/sidebar/updates.svg"
import lobby from "../../assets/sidebar/lobby.svg"
import myTasks from "../../assets/sidebar/myTask.svg"
import support from "../../assets/sidebar/support.svg"
import build from "../../assets/sidebar/build.svg"
import product from "../../assets/sidebar/product.svg"
import customers from "../../assets/sidebar/customers.svg"
import messages from "../../assets/sidebar/message.svg"
import arrow from "../../assets/sidebar/arrow.svg"
import Notification from "./Notification"
import Accordion from "./Accordion"

const Sidebar = () => {
  return (
    <div className="w-[262px] h-screen bg-bgprm border-r-[0.2px] text-[12px] border-r-gray-600 px-3 py-2 flex flex-col justify-between gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h1 className="rounded-md p-1 text-sm bg-sec cursor-pointer">SK</h1>

            <img src={settings} className="h-4 w-4 cursor-pointer" />
          </div>
          <div className="h-6 w-6 bg-hvr rounded-md cursor-pointer flex items-center justify-center">
            <img src={add} className="h-2 w-2" />
          </div>
        </div>

        <div className="flex items-center gap-3 p-[5px] px-2 rounded-md border-[0.5px] border-gray-600">
          <img src={turing} />
          <h1 className="text-txtprm text-[12px] flex-1">Ask Turing</h1>
        </div>
        <div className="flex items-center gap-3 p-[5px] px-2 rounded-md border-[0.5px] border-gray-600">
          <img src={search} className="w-5 h-5" />
          <h1 className="text-txtprm text-[12px] flex-1">Search</h1>
        </div>

        <div className="flex flex-col gap-1 text-txtprm border-b-[0.5px] border-b-gray-600 pb-2">
          <Notification image={updates} text="Updates" />
          <Notification image={lobby} text="Lobby" />
          <Notification image={myTasks} text="My Tasks" />
        </div>

        <div className="flex flex-col gap-1 text-txtprm border-b-[0.5px] border-b-gray-600 pb-2">
          <Accordion
            image={support}
            text="support"
            options={["inbox", "insights", "tickets", "activity"]}
          />
          <Accordion
            image={build}
            text="build"
            options={["insights", "issues", "triage"]}
          />
          <Accordion
            image={product}
            text="product"
            options={["trials", "parts", "roadmaps"]}
          />
          <Accordion
            image={customers}
            text="customers"
            options={["workspaces", "accounts", "insights"]}
          />
        </div>
      </div>

      <div className="flex justify-between items-center py-1">
        <div className="p-2 bg-sec rounded-full cursor-pointer">
          <img src={messages} />
        </div>

        <div className="flex items-center justify-between px-2 w-2/3 h-full rounded-full border-[0.5px] border-gray-600">
            <h1>Onboarding</h1>
            <img src={arrow}/>
        </div>

        <img src={arrow} className="h-3 w-3 cursor-pointer rotate-180"/>
      </div>
    </div>
  )
}
export default Sidebar
