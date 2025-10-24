import 'package:hive/hive.dart';

part 'note_model.g.dart';

@HiveType(typeId: 0)
class Note extends HiveObject {
  @HiveField(0)
  String title;

  @HiveField(1)
  String content;

  @HiveField(2)
  DateTime createdAt;

  @HiveField(3)
  bool isCompleted;

  @HiveField(4)
  String? category;

  @HiveField(5)
  String? imagePath;

  Note({
    required this.title,
    required this.content,
    required this.createdAt,
    this.isCompleted = false,
    this.category,
    this.imagePath,
  });
}
