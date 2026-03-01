import SocChart from '../charts/SocChart';
import VoltageChart from '../charts/VoltageChart';
import CurrentChart from '../charts/CurrentChart';
import TemperatureChart from '../charts/TemperatureChart';

export default function ChartsSection({ data }) {
  return (
    <section className="charts-section">
      <h2 className="charts-section__heading">Charts</h2>
      <div className="row charts_row">
        <div className='col-md-6'>
          
            <div className='charts_blk'>
              <SocChart data={data} />
            </div>
        </div>
        <div className='col-md-6'>
            <div className='charts_blk'>
              <VoltageChart data={data} />
            </div>
        </div>
        <div className='col-md-6'>
          <div className="charts_blk">
            <CurrentChart data={data} />
          </div>
         
        </div>
        <div className='col-md-6'>
          <div className='charts_blk'>
            <TemperatureChart data={data} />
          </div>
         
        </div>
       
        
        
      </div>
    </section>
  );
}
