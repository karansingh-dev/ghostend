"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileJson, Sparkles, Zap } from "lucide-react";
import BasicLoader from "@/components/atoms/basic-loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateApiStorevalue } from "../hooks/useCreateApiStore";
import { useCreateApiForm } from "../hooks/useCreateApiForm";
import { faker } from "@faker-js/faker";
import { fakerOptions } from "@/lib/fakerjs-mapper";

export default function CreateApiForm() {
  const {
    jsonString,
    setJsonString,
    tab,
    setTab,
    isAiGenerating,
    isLoading,
    aiPrompt,
    setAiPrompt,
  } = useCreateApiStorevalue();

  const {
    apiMethod,
    jsonTemplate,
    defaultCount,
    handleSubmit,
    errors,
    setValue,
    register,
    handleArrayCountValue,
    handleJsonChange,
    loadExampleData,
    formatJson,
    clearJsonTemplate,
    onSubmit,
    generateAiJson,
  } = useCreateApiForm();

  const [fieldKey, setFieldKey] = useState("");
  const [fieldMapper, setFieldMapper] = useState("");

  useEffect(() => {
    try {
      const formatted = JSON.stringify(jsonTemplate, null, 2);
      if (formatted !== "{}") {
        setJsonString(formatted);
      }
    } catch (error) {
      toast.error("Invalid JSON template format");
    }
  }, [jsonTemplate, setJsonString]);

  const handleAddField = () => {
    if (!fieldKey.trim() || !fieldMapper) return;
    try {
      const current = jsonString.trim() ? JSON.parse(jsonString) : {};
      const next = { ...current, [fieldKey.trim()]: fieldMapper };
      const nextString = JSON.stringify(next, null, 2);
      handleJsonChange(nextString);
      setFieldKey("");
      setFieldMapper("");
    } catch {
      toast.error("Invalid JSON");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="createApi"
      className="space-y-10"
    >
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">
            Endpoint Configuration
          </CardTitle>
          <CardDescription>
            Configure your ghost API endpoint settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="endpoint">Endpoint Name</Label>
              <Input
                id="endpoint"
                placeholder="eg: users"
                {...register("endPointName")}
              />
              {errors.endPointName && (
                <p className="text-sm text-red-500">
                  {errors.endPointName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="method">HTTP Method</Label>
              <Select
                value={apiMethod}
                onValueChange={(
                  value: "GET" | "POST" | "PATCH" | "DELETE" | "PUT"
                ) => {
                  setValue("apiMethod", value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  {/* <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Array Size</Label>
              <Select
                value={defaultCount.toString()}
                onValueChange={handleArrayCountValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 item</SelectItem>
                  <SelectItem value="5">5 items</SelectItem>
                  <SelectItem value="10">10 items</SelectItem>
                  <SelectItem value="25">25 items</SelectItem>
                  <SelectItem value="50">50 items</SelectItem>
                  <SelectItem value="100">100 items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger
            value="json"
            onClick={() => {
              setTab("json");
            }}
            className="flex items-center gap-2"
          >
            <FileJson className="h-4 w-4" />
            JSON Input
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            onClick={() => {
              setTab("ai");
            }}
            className="flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            AI Generate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="json" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <CardTitle>JSON Input</CardTitle>
                  <CardDescription>
                    Define your data structure using faker mappers
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={formatJson}
                >
                  Format JSON
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label>Field key</Label>
                      <Input
                        placeholder="name"
                        value={fieldKey}
                        onChange={(e) => setFieldKey(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <Label>Faker value</Label>
                      <Select
                        value={fieldMapper}
                        onValueChange={(value) => setFieldMapper(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select faker mapper" />
                        </SelectTrigger>
                        <SelectContent>
                          {fakerOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddField}
                    disabled={!fieldKey.trim() || !fieldMapper}
                  >
                    Add field
                  </Button>
                </div>
                <Textarea
                  className="min-h-[300px] font-mono text-sm"
                  placeholder='{"name": "person.firstName", "email": "internet.email"}'
                  value={jsonString}
                  onChange={(e) => handleJsonChange(e.target.value)}
                />
                {errors.jsonTemplate && (
                  <p className="text-sm text-red-500">Invalid Schema</p>
                )}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={loadExampleData}
                  >
                    Load Example
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearJsonTemplate}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card className="shadow-sm h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                AI Generate
              </CardTitle>
              <CardDescription>
                Describe what kind of data you need and let AI generate it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Describe your data structure... e.g., 'User profile with name, email, avatar, and preferences'"
                  className="min-h-[300px]"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                <Button
                  type="button"
                  className="w-full"
                  onClick={generateAiJson}
                  disabled={isAiGenerating || !aiPrompt.trim()}
                >
                  {isAiGenerating ? (
                    <>
                      <BasicLoader />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate JSON
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          form="createApi"
          disabled={isLoading}
          className="w-full max-w-md"
        >
          {isLoading ? (
            <>
              <BasicLoader />
              Creating API...
            </>
          ) : (
            "Create API Endpoint"
          )}
        </Button>
      </div>
    </form>
  );
}
