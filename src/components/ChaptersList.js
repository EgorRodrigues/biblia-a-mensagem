

export default function ChaptersList (props) {
  const chaptersAmount = Number(props.amount);
  const items = [];

  for (let i = 1; i < chaptersAmount + 1; i++) {
    items.push(<h6>{i}</h6>)  
  }

  return (items)
}