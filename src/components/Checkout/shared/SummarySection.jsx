import Button from "../../common/Button";
import "./SummarySection.css";

function SummarySection({
  title,
  selected,
  summaryContent,
  isExpanded,
  onToggle,
  children
}) {
  const handleToggle = () => {
    onToggle();
  }
  return(
    <div className={`summary-section ${isExpanded ? "expanded" : ''}`}>
      <div className="summary-header" onClick={handleToggle}>
        <div className="summary-title">
          <h3>{title}</h3>
          {!isExpanded && <div className="summary-badge">✓</div>}
        </div>
      </div>
      {!isExpanded && selected && (
      <div className="summary-content">
        {summaryContent}
        <Button variant="text" size="small" onClick={onToggle}>Cambiar</Button>
      </div>
      )}
      {isExpanded && <div className="summary-expanded-content">{children}</div>}
    </div>
  )
}
export default SummarySection;