import { NavLink } from 'react-router-dom';
import Logo2 from '../../images/logo/logo.png';

interface LogoProps {
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ style }) => {
  return (
    <NavLink to="/">
      <img src={Logo2} alt="Logo" height={'auto'} width={'auto'} style={style} />
    </NavLink>
  );
};

export default Logo;