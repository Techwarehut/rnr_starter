import { ComponentProps, FC, Fragment, forwardRef, useMemo } from "react";
import { Platform } from "react-native";
import { Drawer } from "vaul";
import { convertSnapPoints } from "./util";
import { BSHandleProps } from "./types";
import { useIsLargeScreen } from "~/lib/utils";

const BottomSheet = Fragment;

const BottomSheetView = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
    className?: string;
  }
>(({ children, className }, ref) => (
  <Drawer.Portal>
    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
    {useIsLargeScreen() ? (
      <Drawer.Content
        ref={ref}
        className={`bg-popover flex flex-col rounded-t-[10px] rounded-b-[10px] right-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] ${className}`}
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        {children}
      </Drawer.Content>
    ) : (
      <Drawer.Content
        ref={ref}
        className={`bg-popover flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none ${className}`}
      >
        {children}
      </Drawer.Content>
    )}
  </Drawer.Portal>
));

const BottomSheetModalProvider = Fragment;

type BottomSheetModal = ComponentProps<typeof Drawer.Content>;

const BottomSheetModal = ({
  children,
  isOpen,
  snapPoints,
  ...rest
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  snapPoints?: string[];
}) => {
  const isLargeScreen = useIsLargeScreen();
  const combinedSnapPoints = useMemo(() => {
    // Vaul uses different snap points format
    return convertSnapPoints(snapPoints || []);
  }, [snapPoints]);

  return (
    <Drawer.Root
      {...rest}
      snapPoints={combinedSnapPoints}
      direction={isLargeScreen ? "right" : "bottom"}
    >
      {children}
    </Drawer.Root>
  );
};

const BottomSheetScrollView = ({ children }: { children: React.ReactNode }) => (
  <>{children} </>
);

const BottomSheetTrigger = Platform.OS === "web" ? Drawer.Trigger : Fragment;

const BottomSheetHandle: FC<
  BSHandleProps & {
    className?: string;
    animatedIndex?: number;
    animatedPosition?: number;
  }
> = ({ animatedIndex = undefined, animatedPosition = undefined, ...rest }) => {
  if (Platform.OS === "web") return <Drawer.Handle {...rest} />;
  return <Fragment />;
};

export {
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetHandle,
};
