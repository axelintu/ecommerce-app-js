import { useParams } from 'react-router-dom';
import ArtistProducts from '../../components/Artists/ArtistProducts';
import './Artist.css';

function Artist() {
  const { artistId } = useParams();
  return <div className="artist-container"><ArtistProducts artistId={artistId}></ArtistProducts></div>
}

export default Artist;
