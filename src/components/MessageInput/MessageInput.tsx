interface Props {
  onSend: (text: string) => void;
}

export function MessageInput({ onSend }: Props) {
  void onSend;
  return <div>{/* TODO */}</div>;
}
