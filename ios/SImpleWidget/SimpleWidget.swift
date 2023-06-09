//
//  SimpleWidget.swift
//  SimpleWidget
//
//  Created by 송기환 on 2023/04/13.
//

import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(date: Date())
  }
  
  func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    let entry = SimpleEntry(date: Date())
    completion(entry)
  }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    let entry = SimpleEntry(date: Date())
    let entries: [SimpleEntry] = [entry]
    let timeline = Timeline(entries: entries, policy: .atEnd)
    completion(timeline)
  }
}

struct SimpleEntry: TimelineEntry {
  let date: Date
}

struct CircularView: View {
  
  var body: some View {
    ZStack {
      AccessoryWidgetBackground()
      Image("Widget")
        .resizable()
        .aspectRatio(contentMode: .fit)
        .clipShape(Circle())
    }
  }
}

struct SimpleWidgetEntryView : View {
  var entry: Provider.Entry
  
  var body: some View {
    CircularView()
      .widgetURL(URL(string: "linky://blank"))
  }
}

struct SimpleWidget: Widget {
  let kind: String = "SimpleWidget"
  
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: Provider()) { entry in
      SimpleWidgetEntryView(entry: entry)
    }
    .configurationDisplayName("SimpleWidget ConfigurationDisplayName")
    .description(LocalizedStringKey("SimpleWidget Description"))
    .supportedFamilies([.accessoryCircular])
  }
}

struct SimpleWidget_Previews: PreviewProvider {
  static var previews: some View {
    SimpleWidgetEntryView(entry: SimpleEntry(date: Date()))
      .previewContext(WidgetPreviewContext(family: .accessoryCircular))
  }
}
