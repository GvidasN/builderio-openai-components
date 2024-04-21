"use client";
import { builder, Builder } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import CustomTabPanel from "./components/CustomTabs/TabPanel";
import ChatBot from "./components/ChatBot/ChatBot";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

Builder.registerComponent(Counter, {
  name: "Counter",
});

Builder.registerComponent(CustomTabPanel, {
  name: "TabPanel",
});

Builder.registerComponent(ChatBot, {
  name: "ChatBot",
});