const DEFAULT_EDITOR_CONTENT = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Introducing PaperBrain' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Write your first research paper with us!',
        },
      ],
    },
  ],
};

export default DEFAULT_EDITOR_CONTENT;
