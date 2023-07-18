import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../App.scss'
// --------------------------------------------------------------------

function TabsComponent({ myTabs }) {


    return (

        <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3 "
            justify
        >
            {myTabs &&
                (myTabs?.map((tab, index) => {
                   
                   return <Tab
                        eventKey={tab?.href}
                        title={tab?.title}
                        key={tab?.title}
                        className='text-light '
                        variant='warning'
                        tabClassName='text-light'
                    >
                        {tab?.component}
                    </Tab>
}))
            }
        </Tabs>
    );
}

export default TabsComponent;