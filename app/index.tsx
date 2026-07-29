import {
  BottomNav,
  EmptyState,
  HomeHeader,
  ScreenContainer,
} from "../src/components";

export default function Index() {
  return (
    <ScreenContainer>
      <HomeHeader userName="Lucas" />
      <EmptyState />
      <BottomNav activeTab="home" />
    </ScreenContainer>
  );
}
