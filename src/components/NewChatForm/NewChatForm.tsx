interface Props {
  onCreate: (chatId: string) => void;
}

export function NewChatForm({ onCreate }: Props) {
  void onCreate;
  return <div>{/* TODO */}</div>;
}
