const Typography = {
  XLarge: (props: any) => <h1 {...props}>{props.children}</h1>,
  Large: (props: any) => <h2 {...props}>{props.children}</h2>,
  XMedium: (props: any) => <h3 {...props}>{props.children}</h3>,
  Medium: (props: any) => <h4 {...props}>{props.children}</h4>,
  Small: (props: any) => <h5 {...props}>{props.children}</h5>,
  XSmall: (props: any) => <h6 {...props}>{props.children}</h6>,
  Common: (props: any) => <p {...props}>{props.children}</p>,
};

export default Typography;
