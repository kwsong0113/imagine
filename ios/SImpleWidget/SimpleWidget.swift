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
    let entries: [SimpleEntry] = []
    let timeline = Timeline(entries: entries, policy: .atEnd)
    completion(timeline)
  }
}

struct SimpleEntry: TimelineEntry {
  let date: Date
}

struct SimpleWidgetEntryView : View {
  var entry: Provider.Entry
  
  var body: some View {
    GeometryReader { geometry in
      ZStack {
        AccessoryWidgetBackground()
          .widgetURL(URL(string: "imagine://blank"))
        VStack {
          Gauge(value: 100.0, in: 0.0...100.0) {
            Text("G")
          }
          .gaugeStyle(.accessoryCircularCapacity)
        }
      }
    }
    
  }
}

struct SimpleWidget: Widget {
  let kind: String = "SimpleWidget"
  
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: Provider()) { entry in
      SimpleWidgetEntryView(entry: entry)
    }
    .configurationDisplayName("퀵 제스처")
    .description("제스처를 그릴 수 있는 화면을 열어요.")
    .supportedFamilies([.accessoryCircular])
  }
}

struct SimpleWidget_Previews: PreviewProvider {
  static var previews: some View {
    SimpleWidgetEntryView(entry: SimpleEntry(date: Date()))
      .previewContext(WidgetPreviewContext(family: .accessoryCircular))
  }
}
